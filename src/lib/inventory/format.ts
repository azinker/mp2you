export function formatCurrency(value: number | string) {
  const amount = typeof value === "string" ? Number(value) : value;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number.isFinite(amount) ? amount : 0);
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

export function formatEastern(date: Date | string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(new Date(date));
}

export function cartonBreakdown(totalPieces: number, piecesPerCarton: number) {
  const safePiecesPerCarton = Math.max(1, Math.floor(piecesPerCarton || 1));
  return {
    fullCartons: Math.floor(totalPieces / safePiecesPerCarton),
    loosePieces: totalPieces % safePiecesPerCarton,
    totalPieces,
  };
}

export function marginPercent(costValue: number, saleValue: number) {
  if (saleValue <= 0) return 0;
  return ((saleValue - costValue) / saleValue) * 100;
}

export function cleanSku(name: string, suffix: string) {
  const base = name
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 18);
  return `MP2Y-${base || "ITEM"}-${suffix.toUpperCase().slice(-6)}`;
}

export function productStatus(totalPieces: number, lowStockThreshold?: number | null, archivedAt?: Date | null) {
  if (archivedAt) return "ARCHIVED" as const;
  if (totalPieces === 0) return "OUT_OF_STOCK" as const;
  if (lowStockThreshold !== null && lowStockThreshold !== undefined && totalPieces <= lowStockThreshold) {
    return "LOW_STOCK" as const;
  }
  return "ACTIVE" as const;
}
