import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import { config } from "dotenv";

config({ path: ".env.local" });
config({ path: ".env" });

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is required to seed inventory.");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL || "eli@morepower2you.com";
  const password = process.env.SEED_ADMIN_PASSWORD || "1234";

  const admin = await prisma.user.upsert({
    where: { email },
    update: {
      firstName: "Eli",
      lastName: "Zinker",
      passwordHash: await bcrypt.hash(password, 12),
      status: "ACTIVE",
      isOriginalAdmin: true,
      reportOptIn: true,
    },
    create: {
      firstName: "Eli",
      lastName: "Zinker",
      email,
      passwordHash: await bcrypt.hash(password, 12),
      status: "ACTIVE",
      isOriginalAdmin: true,
      reportOptIn: true,
    },
  });

  console.log(`Seeded original admin: ${admin.email}`);

  if (process.env.INVENTORY_SEED_DEMO !== "true" && !process.argv.includes("--demo")) {
    console.log("Skipped demo inventory. Set INVENTORY_SEED_DEMO=true or pass --demo for local demo data.");
    return;
  }

  const studio = await prisma.studio.upsert({
    where: { id: "demo-slotomania" },
    update: {},
    create: {
      id: "demo-slotomania",
      name: "Slotomania",
      repName: "Laurie Zinker",
      repEmail: "laurie@example.com",
      notes: "Local demo Studio only.",
      createdById: admin.id,
      updatedById: admin.id,
    },
  });

  const location = await prisma.location.upsert({
    where: { id: "demo-upper-pallets" },
    update: {},
    create: {
      id: "demo-upper-pallets",
      name: "Upper Pallets",
      description: "Local demo location only.",
    },
  });

  const supplier = await prisma.supplier.upsert({
    where: { id: "demo-supplier" },
    update: {},
    create: {
      id: "demo-supplier",
      name: "Demo Supplier",
      contactName: "Demo Contact",
      email: "supplier@example.com",
    },
  });

  const product = await prisma.product.upsert({
    where: { internalSku: "MP2Y-ICE-CREAM-MACHINE-DEMO" },
    update: {},
    create: {
      name: "Ice Cream Machine",
      internalSku: "MP2Y-ICE-CREAM-MACHINE-DEMO",
      piecesPerCarton: 5,
      unitCost: 80,
      unitSalePrice: 140,
      lowStockThreshold: 10,
      totalPiecesOnHand: 47,
      status: "ACTIVE",
      studioId: studio.id,
      locationId: location.id,
      supplierId: supplier.id,
      locationText: "Upper Pallets",
      notes: "Local demo product showing 9 full cartons + 2 loose pieces.",
      createdById: admin.id,
      updatedById: admin.id,
    },
  });

  await prisma.inventoryBalance.upsert({
    where: {
      productId_studioId_locationId_locationText: {
        productId: product.id,
        studioId: studio.id,
        locationId: location.id,
        locationText: "Upper Pallets",
      },
    },
    update: { piecesOnHand: 47 },
    create: {
      productId: product.id,
      studioId: studio.id,
      locationId: location.id,
      locationText: "Upper Pallets",
      piecesOnHand: 47,
    },
  });

  await prisma.activityLog.create({
    data: {
      userId: admin.id,
      action: "INVENTORY_INITIAL_COUNT",
      entityType: "INVENTORY",
      entityId: product.id,
      entityName: product.name,
      studioId: studio.id,
      productId: product.id,
      summary: "Demo seed created Ice Cream Machine with 47 pieces: 9 full cartons + 2 loose pieces.",
      note: "Local demo data only. Do not seed demo inventory into production unless approved.",
    },
  });

  console.log("Seeded local demo Studio, product, location, supplier, and inventory.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
