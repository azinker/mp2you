"use server";

import { randomBytes, createHash } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { ActivityAction, EntityType, InventoryTransactionType, RemovalReason } from "@prisma/client";
import { db } from "@/lib/inventory/db";
import {
  checkLoginRateLimit,
  clearLoginRateLimit,
  createSession,
  destroySession,
  hashPassword,
  requireInventoryUser,
  verifyPassword,
} from "@/lib/inventory/auth";
import { appUrl, brandedEmailShell, sendInventoryEmail } from "@/lib/inventory/email";
import { cleanSku, productStatus } from "@/lib/inventory/format";
import { uploadInventoryImage } from "@/lib/inventory/r2";
import { sendWeeklyReport } from "@/lib/inventory/reports";

type FormState = { error?: string; success?: string } | undefined;

function stringValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function optionalString(formData: FormData, key: string) {
  const value = stringValue(formData, key);
  return value.length ? value : null;
}

function intValue(formData: FormData, key: string, fallback = 0) {
  const value = Number.parseInt(stringValue(formData, key), 10);
  return Number.isFinite(value) ? value : fallback;
}

function decimalValue(formData: FormData, key: string) {
  const value = Number(stringValue(formData, key) || "0");
  return Number.isFinite(value) ? value : 0;
}

function fileValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return value instanceof File ? value : null;
}

function tokenHash(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function newToken() {
  return randomBytes(32).toString("base64url");
}

async function logActivity(data: {
  userId?: string | null;
  action: ActivityAction;
  entityType: EntityType;
  entityId?: string | null;
  entityName: string;
  summary: string;
  note?: string | null;
  studioId?: string | null;
  productId?: string | null;
  supplierId?: string | null;
  locationId?: string | null;
  relatedUserId?: string | null;
  beforeValues?: object;
  afterValues?: object;
}) {
  await db.activityLog.create({ data });
}

export async function loginAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const email = stringValue(formData, "email").toLowerCase();
  const password = stringValue(formData, "password");
  const remember = formData.get("remember") === "on";
  const rateKey = email || "anonymous";

  if (!checkLoginRateLimit(rateKey)) {
    return { error: "Too many login attempts. Please wait 15 minutes and try again." };
  }

  const user = await db.user.findUnique({ where: { email } });
  if (!user || user.status !== "ACTIVE" || !(await verifyPassword(password, user.passwordHash))) {
    return { error: "Email or password is incorrect." };
  }

  clearLoginRateLimit(rateKey);
  await db.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });
  await logActivity({
    userId: user.id,
    action: "LOGIN",
    entityType: "USER",
    entityId: user.id,
    entityName: `${user.firstName} ${user.lastName}`,
    summary: `${user.firstName} ${user.lastName} logged in.`,
  });
  await createSession(user.id, remember);
  redirect("/inventory/dashboard");
}

export async function logoutAction() {
  await destroySession();
  redirect("/inventory/login");
}

export async function createStudioAction(formData: FormData) {
  const user = await requireInventoryUser();
  const parsed = z
    .object({
      name: z.string().min(1),
      repName: z.string().min(1),
      repEmail: z.email(),
      repPhone: z.string().optional(),
      address: z.string().optional(),
      notes: z.string().optional(),
    })
    .parse({
      name: stringValue(formData, "name"),
      repName: stringValue(formData, "repName"),
      repEmail: stringValue(formData, "repEmail"),
      repPhone: stringValue(formData, "repPhone"),
      address: stringValue(formData, "address"),
      notes: stringValue(formData, "notes"),
    });

  const studio = await db.studio.create({
    data: {
      name: parsed.name,
      repName: parsed.repName,
      repEmail: parsed.repEmail,
      repPhone: parsed.repPhone || null,
      address: parsed.address || null,
      notes: parsed.notes || null,
      createdById: user.id,
      updatedById: user.id,
    },
  });
  const avatarUrl = await uploadInventoryImage(fileValue(formData, "avatar"), "STUDIO", studio.id, user.id);
  if (avatarUrl) {
    await db.studio.update({ where: { id: studio.id }, data: { avatarUrl } });
  }
  await logActivity({
    userId: user.id,
    action: "STUDIO_CREATED",
    entityType: "STUDIO",
    entityId: studio.id,
    entityName: studio.name,
    studioId: studio.id,
    summary: `${user.firstName} ${user.lastName} created Studio ${studio.name}.`,
  });
  revalidatePath("/inventory");
  redirect(`/inventory/studios/${studio.id}`);
}

export async function createSupplierAction(formData: FormData) {
  const user = await requireInventoryUser();
  const name = stringValue(formData, "name");
  if (!name) throw new Error("Supplier name is required.");
  const supplier = await db.supplier.create({
    data: {
      name,
      contactName: optionalString(formData, "contactName"),
      email: optionalString(formData, "email"),
      phone: optionalString(formData, "phone"),
      notes: optionalString(formData, "notes"),
    },
  });
  await logActivity({
    userId: user.id,
    action: "SUPPLIER_CREATED",
    entityType: "SUPPLIER",
    entityId: supplier.id,
    entityName: supplier.name,
    supplierId: supplier.id,
    summary: `${user.firstName} ${user.lastName} created supplier ${supplier.name}.`,
  });
  revalidatePath("/inventory/settings/suppliers");
}

export async function createLocationAction(formData: FormData) {
  const user = await requireInventoryUser();
  const name = stringValue(formData, "name");
  if (!name) throw new Error("Location name is required.");
  const location = await db.location.create({
    data: { name, description: optionalString(formData, "description") },
  });
  await logActivity({
    userId: user.id,
    action: "LOCATION_CREATED",
    entityType: "LOCATION",
    entityId: location.id,
    entityName: location.name,
    locationId: location.id,
    summary: `${user.firstName} ${user.lastName} created location ${location.name}.`,
  });
  revalidatePath("/inventory/settings/locations");
}

export async function createProductAction(formData: FormData) {
  const user = await requireInventoryUser();
  const name = stringValue(formData, "name");
  const piecesPerCarton = intValue(formData, "piecesPerCarton", 1);
  const studioId = optionalString(formData, "studioId");
  if (!name || piecesPerCarton < 1) throw new Error("Product name and pieces per carton are required.");

  const idSuffix = randomBytes(4).toString("hex");
  const manualSku = optionalString(formData, "manualSku");
  const product = await db.product.create({
    data: {
      name,
      manualSku,
      internalSku: manualSku || cleanSku(name, idSuffix),
      piecesPerCarton,
      unitCost: decimalValue(formData, "unitCost"),
      unitSalePrice: decimalValue(formData, "unitSalePrice"),
      lowStockThreshold: optionalString(formData, "lowStockThreshold") ? intValue(formData, "lowStockThreshold") : null,
      locationText: optionalString(formData, "locationText"),
      supplierText: optionalString(formData, "supplierText"),
      studioId,
      supplierId: optionalString(formData, "supplierId"),
      locationId: optionalString(formData, "locationId"),
      notes: optionalString(formData, "notes"),
      createdById: user.id,
      updatedById: user.id,
    },
  });
  const imageUrl = await uploadInventoryImage(fileValue(formData, "image"), "PRODUCT", product.id, user.id);
  if (imageUrl) {
    await db.product.update({ where: { id: product.id }, data: { imageUrl } });
  }
  await logActivity({
    userId: user.id,
    action: "PRODUCT_CREATED",
    entityType: "PRODUCT",
    entityId: product.id,
    entityName: product.name,
    studioId,
    productId: product.id,
    summary: `${user.firstName} ${user.lastName} created product ${product.name}.`,
  });
  revalidatePath("/inventory");
  redirect(`/inventory/products/${product.id}`);
}

async function findBalance(
  client: Pick<typeof db, "inventoryBalance">,
  productId: string,
  studioId: string | null,
  locationText: string | null,
) {
  const balance = await client.inventoryBalance.findFirst({
    where: { productId, studioId, locationText },
  });
  if (balance) return balance;
  return client.inventoryBalance.create({
    data: { productId, studioId, locationText, piecesOnHand: 0 },
  });
}

async function refreshProductTotal(productId: string, userId: string) {
  const product = await db.product.findUnique({
    where: { id: productId },
    include: { balances: true },
  });
  if (!product) throw new Error("Product not found.");
  const total = product.balances.reduce((sum, balance) => sum + balance.piecesOnHand, 0);
  return db.product.update({
    where: { id: productId },
    data: {
      totalPiecesOnHand: total,
      status: productStatus(total, product.lowStockThreshold, product.archivedAt),
      updatedById: userId,
    },
  });
}

export async function inventoryTransactionAction(formData: FormData) {
  const user = await requireInventoryUser();
  const productId = stringValue(formData, "productId");
  const type = stringValue(formData, "type") as InventoryTransactionType;
  const quantityPieces = intValue(formData, "quantityPieces");
  const reason = optionalString(formData, "reason") as RemovalReason | null;
  const note = optionalString(formData, "note");
  const toStudioId = optionalString(formData, "toStudioId");
  const toLocationText = optionalString(formData, "toLocationText");

  if (!productId || !Object.values(InventoryTransactionType).includes(type)) throw new Error("Choose a valid inventory action.");
  if (!Number.isInteger(quantityPieces) || quantityPieces <= 0) throw new Error("Quantity must be a positive whole number.");
  if ((type === "REMOVE" || type === "TRANSFER" || type === "CORRECTION") && !note) {
    throw new Error("Notes are required for removals, transfers, and corrections.");
  }
  if (type === "REMOVE" && !reason) throw new Error("Removal reason is required.");

  const product = await db.product.findUnique({ where: { id: productId } });
  if (!product) throw new Error("Product not found.");

  const fromStudioId = optionalString(formData, "fromStudioId") || product.studioId;
  const fromLocationText = optionalString(formData, "fromLocationText") || product.locationText;
  const previousTotal = product.totalPiecesOnHand;
  let resultingTotal = previousTotal;

  await db.$transaction(async (tx) => {
    if (type === "INITIAL_COUNT") {
      const balance = await tx.inventoryBalance.findFirst({ where: { productId, studioId: fromStudioId, locationText: fromLocationText } });
      if (balance) {
        await tx.inventoryBalance.update({ where: { id: balance.id }, data: { piecesOnHand: quantityPieces } });
      } else {
        await tx.inventoryBalance.create({ data: { productId, studioId: fromStudioId, locationText: fromLocationText, piecesOnHand: quantityPieces } });
      }
      resultingTotal = quantityPieces;
    }

    if (type === "ADD") {
      const balance = await findBalance(tx, productId, fromStudioId, fromLocationText);
      await tx.inventoryBalance.update({ where: { id: balance.id }, data: { piecesOnHand: balance.piecesOnHand + quantityPieces } });
      resultingTotal = previousTotal + quantityPieces;
    }

    if (type === "REMOVE") {
      const balance = await findBalance(tx, productId, fromStudioId, fromLocationText);
      if (quantityPieces > balance.piecesOnHand || quantityPieces > previousTotal) throw new Error("Removal exceeds available inventory.");
      await tx.inventoryBalance.update({ where: { id: balance.id }, data: { piecesOnHand: balance.piecesOnHand - quantityPieces } });
      resultingTotal = previousTotal - quantityPieces;
    }

    if (type === "TRANSFER") {
      const fromBalance = await findBalance(tx, productId, fromStudioId, fromLocationText);
      if (quantityPieces > fromBalance.piecesOnHand) throw new Error("Transfer exceeds available inventory.");
      const toBalance = await findBalance(tx, productId, toStudioId, toLocationText);
      await tx.inventoryBalance.update({ where: { id: fromBalance.id }, data: { piecesOnHand: fromBalance.piecesOnHand - quantityPieces } });
      await tx.inventoryBalance.update({ where: { id: toBalance.id }, data: { piecesOnHand: toBalance.piecesOnHand + quantityPieces } });
      resultingTotal = previousTotal;
    }

    if (type === "CORRECTION") {
      const newTotal = quantityPieces;
      const currentBalances = await tx.inventoryBalance.findMany({ where: { productId } });
      await Promise.all(currentBalances.map((balance) => tx.inventoryBalance.update({ where: { id: balance.id }, data: { piecesOnHand: 0 } })));
      const balance = await tx.inventoryBalance.findFirst({ where: { productId, studioId: fromStudioId, locationText: fromLocationText } });
      if (balance) {
        await tx.inventoryBalance.update({ where: { id: balance.id }, data: { piecesOnHand: newTotal } });
      } else {
        await tx.inventoryBalance.create({ data: { productId, studioId: fromStudioId, locationText: fromLocationText, piecesOnHand: newTotal } });
      }
      resultingTotal = newTotal;
    }

    await tx.product.update({
      where: { id: productId },
      data: {
        totalPiecesOnHand: resultingTotal,
        status: productStatus(resultingTotal, product.lowStockThreshold, product.archivedAt),
        updatedById: user.id,
      },
    });
    await tx.inventoryTransaction.create({
      data: {
        productId,
        type,
        quantityPieces,
        previousTotal,
        resultingTotal,
        fromStudioId,
        toStudioId,
        fromLocationText,
        toLocationText,
        reason,
        note,
        createdById: user.id,
      },
    });
  });

  await refreshProductTotal(productId, user.id);
  const actionMap: Record<InventoryTransactionType, ActivityAction> = {
    INITIAL_COUNT: "INVENTORY_INITIAL_COUNT",
    ADD: "INVENTORY_ADDED",
    REMOVE: "INVENTORY_REMOVED",
    TRANSFER: "INVENTORY_TRANSFERRED",
    CORRECTION: "INVENTORY_CORRECTED",
  };
  await logActivity({
    userId: user.id,
    action: actionMap[type],
    entityType: "INVENTORY",
    entityId: productId,
    entityName: product.name,
    studioId: fromStudioId,
    productId,
    note,
    beforeValues: { totalPieces: previousTotal },
    afterValues: { totalPieces: resultingTotal },
    summary: `${user.firstName} ${user.lastName} ${type.toLowerCase().replace("_", " ")} ${quantityPieces} piece(s) for ${product.name}. Resulting balance: ${resultingTotal} pieces.`,
  });

  revalidatePath("/inventory");
  redirect(`/inventory/products/${productId}`);
}

export async function archiveEntityAction(formData: FormData) {
  const user = await requireInventoryUser();
  const entity = stringValue(formData, "entity");
  const id = stringValue(formData, "id");
  const confirm = stringValue(formData, "confirm");
  if (confirm !== "ARCHIVE") throw new Error("Type ARCHIVE to confirm.");

  if (entity === "product") {
    const product = await db.product.update({ where: { id }, data: { archivedAt: new Date(), status: "ARCHIVED", updatedById: user.id } });
    await logActivity({ userId: user.id, action: "PRODUCT_ARCHIVED", entityType: "PRODUCT", entityId: id, entityName: product.name, productId: id, summary: `${user.firstName} ${user.lastName} archived product ${product.name}.` });
  }
  if (entity === "studio") {
    const studio = await db.studio.update({ where: { id }, data: { archivedAt: new Date(), updatedById: user.id } });
    await logActivity({ userId: user.id, action: "STUDIO_ARCHIVED", entityType: "STUDIO", entityId: id, entityName: studio.name, studioId: id, summary: `${user.firstName} ${user.lastName} archived Studio ${studio.name}.` });
  }
  if (entity === "user") {
    const target = await db.user.findUnique({ where: { id } });
    if (!target) throw new Error("User not found.");
    if (target.isOriginalAdmin) throw new Error("The original seeded admin cannot be deactivated by other users.");
    await db.user.update({ where: { id }, data: { status: "DEACTIVATED" } });
    await logActivity({ userId: user.id, action: "USER_DEACTIVATED", entityType: "USER", entityId: id, entityName: target.email, relatedUserId: id, summary: `${user.firstName} ${user.lastName} deactivated ${target.email}.` });
  }
  revalidatePath("/inventory");
}

export async function deleteEntityAction(formData: FormData) {
  const user = await requireInventoryUser();
  const entity = stringValue(formData, "entity");
  const id = stringValue(formData, "id");
  const confirm = stringValue(formData, "confirm");
  if (confirm !== "DELETE") throw new Error("Type DELETE to confirm.");

  if (entity === "product") {
    const product = await db.product.findUnique({ where: { id } });
    if (!product) throw new Error("Product not found.");

    await db.$transaction(async (tx) => {
      await tx.inventoryTransaction.deleteMany({ where: { productId: id } });
      await tx.inventoryBalance.deleteMany({ where: { productId: id } });
      await tx.uploadedAsset.deleteMany({ where: { ownerType: "PRODUCT", ownerId: id } });
      await tx.product.delete({ where: { id } });
      await tx.activityLog.create({
        data: {
          userId: user.id,
          action: "PRODUCT_ARCHIVED",
          entityType: "PRODUCT",
          entityId: id,
          entityName: product.name,
          summary: `${user.firstName} ${user.lastName} permanently deleted product ${product.name}.`,
          beforeValues: {
            name: product.name,
            internalSku: product.internalSku,
            totalPiecesOnHand: product.totalPiecesOnHand,
          },
        },
      });
    });

    revalidatePath("/inventory");
    redirect("/inventory/products");
  }

  if (entity === "studio") {
    const studio = await db.studio.findUnique({ where: { id } });
    if (!studio) throw new Error("Studio not found.");

    await db.$transaction(async (tx) => {
      await tx.product.updateMany({ where: { studioId: id }, data: { studioId: null, updatedById: user.id } });
      await tx.inventoryBalance.updateMany({ where: { studioId: id }, data: { studioId: null } });
      await tx.uploadedAsset.deleteMany({ where: { ownerType: "STUDIO", ownerId: id } });
      await tx.studio.delete({ where: { id } });
      await tx.activityLog.create({
        data: {
          userId: user.id,
          action: "STUDIO_ARCHIVED",
          entityType: "STUDIO",
          entityId: id,
          entityName: studio.name,
          summary: `${user.firstName} ${user.lastName} permanently deleted Studio ${studio.name}. Products were moved to Unassigned Inventory.`,
          beforeValues: {
            name: studio.name,
            repName: studio.repName,
            repEmail: studio.repEmail,
          },
        },
      });
    });

    revalidatePath("/inventory");
    redirect("/inventory/studios");
  }

  throw new Error("Choose a valid entity to delete.");
}

export async function updateProfileAction(formData: FormData) {
  const user = await requireInventoryUser();
  const firstName = stringValue(formData, "firstName");
  const lastName = stringValue(formData, "lastName");
  if (!firstName || !lastName) throw new Error("First and last name are required.");
  const avatarUrl = await uploadInventoryImage(fileValue(formData, "avatar"), "USER", user.id, user.id);
  await db.user.update({
    where: { id: user.id },
    data: {
      firstName,
      lastName,
      themePreference: stringValue(formData, "themePreference") as "SYSTEM" | "LIGHT" | "DARK",
      reportOptIn: formData.get("reportOptIn") === "on",
      ...(avatarUrl ? { avatarUrl } : {}),
    },
  });
  await logActivity({ userId: user.id, action: avatarUrl ? "AVATAR_CHANGED" : "USER_UPDATED", entityType: "USER", entityId: user.id, entityName: user.email, summary: `${user.firstName} ${user.lastName} updated their profile.` });
  revalidatePath("/inventory/settings/profile");
}

export async function changePasswordAction(formData: FormData) {
  const user = await requireInventoryUser();
  const currentPassword = stringValue(formData, "currentPassword");
  const newPassword = stringValue(formData, "newPassword");
  if (newPassword.length < 8) throw new Error("New password must be at least 8 characters.");
  const fullUser = await db.user.findUnique({ where: { id: user.id } });
  if (!fullUser || !(await verifyPassword(currentPassword, fullUser.passwordHash))) throw new Error("Current password is incorrect.");
  await db.user.update({ where: { id: user.id }, data: { passwordHash: await hashPassword(newPassword) } });
  await logActivity({ userId: user.id, action: "PASSWORD_CHANGED", entityType: "USER", entityId: user.id, entityName: user.email, summary: `${user.firstName} ${user.lastName} changed their password.` });
}

export async function inviteUserAction(formData: FormData) {
  const user = await requireInventoryUser();
  const firstName = stringValue(formData, "firstName");
  const lastName = stringValue(formData, "lastName");
  const email = stringValue(formData, "email").toLowerCase();
  const parsed = z.object({ firstName: z.string().min(1), lastName: z.string().min(1), email: z.email() }).parse({ firstName, lastName, email });
  const token = newToken();
  await db.inviteToken.create({
    data: {
      firstName: parsed.firstName,
      lastName: parsed.lastName,
      email: parsed.email,
      tokenHash: tokenHash(token),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      createdById: user.id,
    },
  });
  await sendInventoryEmail({
    to: parsed.email,
    subject: "MorePower2You Inventory Portal invite",
    html: brandedEmailShell(
      "Inventory Portal Invite",
      `<p>${user.firstName} invited you to the MorePower2You Inventory Portal.</p><p><a href="${appUrl(`/inventory/invite/accept?token=${token}`)}">Accept invite and set your password</a></p>`,
    ),
  });
  await logActivity({ userId: user.id, action: "USER_INVITED", entityType: "USER", entityName: parsed.email, summary: `${user.firstName} ${user.lastName} invited ${parsed.email}.` });
  revalidatePath("/inventory/settings/users");
}

export async function acceptInviteAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const token = stringValue(formData, "token");
  const password = stringValue(formData, "password");
  if (password.length < 8) return { error: "Password must be at least 8 characters." };
  const invite = await db.inviteToken.findFirst({ where: { tokenHash: tokenHash(token), acceptedAt: null, expiresAt: { gt: new Date() } } });
  if (!invite) return { error: "Invite is invalid or expired." };
  const user = await db.user.upsert({
    where: { email: invite.email },
    update: { firstName: invite.firstName, lastName: invite.lastName, passwordHash: await hashPassword(password), status: "ACTIVE" },
    create: { firstName: invite.firstName, lastName: invite.lastName, email: invite.email, passwordHash: await hashPassword(password), status: "ACTIVE" },
  });
  await db.inviteToken.update({ where: { id: invite.id }, data: { acceptedAt: new Date() } });
  await logActivity({ userId: user.id, action: "USER_ACCEPTED_INVITE", entityType: "USER", entityId: user.id, entityName: user.email, summary: `${user.firstName} ${user.lastName} accepted an inventory portal invite.` });
  await createSession(user.id, true);
  redirect("/inventory/dashboard");
}

export async function forgotPasswordAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const email = stringValue(formData, "email").toLowerCase();
  const user = await db.user.findUnique({ where: { email } });
  if (user) {
    const token = newToken();
    await db.passwordResetToken.create({
      data: { userId: user.id, tokenHash: tokenHash(token), expiresAt: new Date(Date.now() + 1000 * 60 * 60) },
    });
    await sendInventoryEmail({
      to: user.email,
      subject: "Reset your MorePower2You Inventory password",
      html: brandedEmailShell("Reset Inventory Password", `<p><a href="${appUrl(`/inventory/reset-password?token=${token}`)}">Reset your password</a></p>`),
    });
  }
  return { success: "If that email exists, a reset link has been sent." };
}

export async function resetPasswordAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const token = stringValue(formData, "token");
  const password = stringValue(formData, "password");
  if (password.length < 8) return { error: "Password must be at least 8 characters." };
  const reset = await db.passwordResetToken.findFirst({ where: { tokenHash: tokenHash(token), usedAt: null, expiresAt: { gt: new Date() } } });
  if (!reset) return { error: "Reset link is invalid or expired." };
  await db.user.update({ where: { id: reset.userId }, data: { passwordHash: await hashPassword(password) } });
  await db.passwordResetToken.update({ where: { id: reset.id }, data: { usedAt: new Date() } });
  await logActivity({ userId: reset.userId, action: "PASSWORD_CHANGED", entityType: "USER", entityId: reset.userId, entityName: "Password reset", summary: "A user reset their inventory portal password." });
  return { success: "Password reset. You can log in now." };
}

export async function sendManualReportAction(formData: FormData) {
  const user = await requireInventoryUser();
  const mode = stringValue(formData, "mode");
  await sendWeeklyReport(mode === "test" ? "TEST" : "MANUAL", user.id, mode === "test" ? user.email : undefined);
  revalidatePath("/inventory/reports");
}
