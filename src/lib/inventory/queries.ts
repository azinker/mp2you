import "server-only";

import { Prisma } from "@prisma/client";
import { db } from "@/lib/inventory/db";
import { marginPercent, productStatus } from "@/lib/inventory/format";

export type InventoryProduct = Awaited<ReturnType<typeof getInventoryProducts>>[number];
export type InventoryStudio = Awaited<ReturnType<typeof getStudiosWithMetrics>>[number];

export async function getInventoryProducts(search?: string) {
  const where: Prisma.ProductWhereInput = search
    ? {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { internalSku: { contains: search, mode: "insensitive" } },
          { manualSku: { contains: search, mode: "insensitive" } },
          { notes: { contains: search, mode: "insensitive" } },
          { locationText: { contains: search, mode: "insensitive" } },
          { supplierText: { contains: search, mode: "insensitive" } },
          { studio: { name: { contains: search, mode: "insensitive" } } },
          { supplier: { name: { contains: search, mode: "insensitive" } } },
          { location: { name: { contains: search, mode: "insensitive" } } },
        ],
      }
    : {};

  const products = await db.product.findMany({
    where,
    orderBy: [{ archivedAt: "asc" }, { name: "asc" }],
    include: {
      studio: true,
      supplier: true,
      location: true,
      updatedBy: { select: { firstName: true, lastName: true, email: true } },
      balances: { include: { studio: true, location: true } },
    },
  });

  return products.map((product) => {
    const totalPieces = product.totalPiecesOnHand;
    const unitCost = Number(product.unitCost);
    const unitSalePrice = Number(product.unitSalePrice);
    const costValue = totalPieces * unitCost;
    const saleValue = totalPieces * unitSalePrice;
    return {
      ...product,
      computedStatus: productStatus(totalPieces, product.lowStockThreshold, product.archivedAt),
      unitCost,
      unitSalePrice,
      costValue,
      saleValue,
      profitValue: saleValue - costValue,
      margin: marginPercent(costValue, saleValue),
    };
  });
}

export async function getStudiosWithMetrics() {
  const [studios, products] = await Promise.all([
    db.studio.findMany({
      orderBy: [{ archivedAt: "asc" }, { name: "asc" }],
      include: {
        updatedBy: { select: { firstName: true, lastName: true, email: true } },
      },
    }),
    getInventoryProducts(),
  ]);

  const studioRows = studios.map((studio) => {
    const assigned = products.filter((product) => product.studioId === studio.id && !product.archivedAt);
    const totalPieces = assigned.reduce((sum, product) => sum + product.totalPiecesOnHand, 0);
    const costValue = assigned.reduce((sum, product) => sum + product.costValue, 0);
    const saleValue = assigned.reduce((sum, product) => sum + product.saleValue, 0);
    return {
      ...studio,
      productCount: assigned.length,
      totalPieces,
      costValue,
      saleValue,
      profitValue: saleValue - costValue,
      margin: marginPercent(costValue, saleValue),
      lowStockCount: assigned.filter((product) => product.computedStatus === "LOW_STOCK").length,
      outOfStockCount: assigned.filter((product) => product.computedStatus === "OUT_OF_STOCK").length,
      recentChanges: assigned
        .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
        .slice(0, 3)
        .map((product) => product.name),
    };
  });

  const unassigned = products.filter((product) => !product.studioId && !product.archivedAt);
  return [
    ...studioRows,
    {
      id: "unassigned",
      name: "Unassigned Inventory",
      repName: "Operations",
      repEmail: "inventory@morepower2you.com",
      repPhone: null,
      address: null,
      avatarUrl: null,
      notes: "Products not currently assigned to a Studio.",
      archivedAt: null,
      createdById: "",
      updatedById: null,
      createdAt: new Date(0),
      updatedAt: new Date(0),
      updatedBy: null,
      productCount: unassigned.length,
      totalPieces: unassigned.reduce((sum, product) => sum + product.totalPiecesOnHand, 0),
      costValue: unassigned.reduce((sum, product) => sum + product.costValue, 0),
      saleValue: unassigned.reduce((sum, product) => sum + product.saleValue, 0),
      profitValue: unassigned.reduce((sum, product) => sum + product.profitValue, 0),
      margin: marginPercent(
        unassigned.reduce((sum, product) => sum + product.costValue, 0),
        unassigned.reduce((sum, product) => sum + product.saleValue, 0),
      ),
      lowStockCount: unassigned.filter((product) => product.computedStatus === "LOW_STOCK").length,
      outOfStockCount: unassigned.filter((product) => product.computedStatus === "OUT_OF_STOCK").length,
      recentChanges: unassigned
        .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
        .slice(0, 3)
        .map((product) => product.name),
    },
  ];
}

export async function getDashboardData(search?: string) {
  const [products, studios, activity, suppliers, locations, users, reports] = await Promise.all([
    getInventoryProducts(search),
    getStudiosWithMetrics(),
    db.activityLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 18,
      include: { user: { select: { firstName: true, lastName: true, email: true } } },
    }),
    db.supplier.findMany({ orderBy: { name: "asc" } }),
    db.location.findMany({ orderBy: { name: "asc" } }),
    db.user.findMany({ orderBy: { createdAt: "desc" } }),
    db.weeklyReportRun.findMany({ orderBy: { createdAt: "desc" }, take: 8 }),
  ]);

  const activeProducts = products.filter((product) => !product.archivedAt);
  const costValue = activeProducts.reduce((sum, product) => sum + product.costValue, 0);
  const saleValue = activeProducts.reduce((sum, product) => sum + product.saleValue, 0);

  return {
    products,
    studios,
    activity,
    suppliers,
    locations,
    users,
    reports,
    metrics: {
      totalPieces: activeProducts.reduce((sum, product) => sum + product.totalPiecesOnHand, 0),
      productCount: activeProducts.length,
      costValue,
      saleValue,
      profitValue: saleValue - costValue,
      margin: marginPercent(costValue, saleValue),
      lowStockCount: activeProducts.filter((product) => product.computedStatus === "LOW_STOCK").length,
      outOfStockCount: activeProducts.filter((product) => product.computedStatus === "OUT_OF_STOCK").length,
    },
  };
}

export async function getProductDetail(id: string) {
  const [product, transactions, activity] = await Promise.all([
    db.product.findUnique({
      where: { id },
      include: {
        studio: true,
        supplier: true,
        location: true,
        createdBy: { select: { firstName: true, lastName: true, email: true } },
        updatedBy: { select: { firstName: true, lastName: true, email: true } },
        balances: { include: { studio: true, location: true } },
      },
    }),
    db.inventoryTransaction.findMany({
      where: { productId: id },
      orderBy: { createdAt: "desc" },
      include: { createdBy: { select: { firstName: true, lastName: true, email: true } } },
    }),
    db.activityLog.findMany({ where: { productId: id }, orderBy: { createdAt: "desc" }, take: 30 }),
  ]);
  return { product, transactions, activity };
}

export async function getStudioDetail(id: string) {
  const [studio, products, activity] = await Promise.all([
    db.studio.findUnique({
      where: { id },
      include: { updatedBy: { select: { firstName: true, lastName: true, email: true } } },
    }),
    getInventoryProducts(),
    db.activityLog.findMany({ where: { studioId: id }, orderBy: { createdAt: "desc" }, take: 30 }),
  ]);
  return { studio, products: products.filter((product) => product.studioId === id), activity };
}
