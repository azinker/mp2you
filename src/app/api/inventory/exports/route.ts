import { NextRequest } from "next/server";
import ExcelJS from "exceljs";
import { requireInventoryUser } from "@/lib/inventory/auth";
import { getDashboardData } from "@/lib/inventory/queries";
import { formatEastern } from "@/lib/inventory/format";

export const dynamic = "force-dynamic";

function csvEscape(value: unknown) {
  const text = String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
}

export async function GET(request: NextRequest) {
  await requireInventoryUser();
  const data = await getDashboardData();
  const format = request.nextUrl.searchParams.get("format") || "csv";
  const status = request.nextUrl.searchParams.get("status") || "active";
  const products = data.products.filter((product) => {
    if (status === "archived") return !!product.archivedAt;
    if (status === "all") return true;
    return !product.archivedAt;
  });
  const rows = products.map((product) => ({
    Product: product.name,
    SKU: product.internalSku,
    Studio: product.studio?.name || "Unassigned",
    Supplier: product.supplier?.name || product.supplierText || "",
    Location: product.location?.name || product.locationText || "",
    "Pieces per carton": product.piecesPerCarton,
    "Total pieces": product.totalPiecesOnHand,
    "Unit cost": product.unitCost,
    "Unit sale price": product.unitSalePrice,
    "Cost value": product.costValue,
    "Sale value": product.saleValue,
    "Profit value": product.profitValue,
    "Margin %": product.margin.toFixed(2),
    Status: product.computedStatus,
    "Updated at": formatEastern(product.updatedAt),
  }));

  if (format === "xlsx") {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Inventory");
    worksheet.columns = Object.keys(rows[0] || { Product: "", SKU: "", Studio: "" }).map((header) => ({
      header,
      key: header,
      width: Math.max(14, header.length + 4),
    }));
    rows.forEach((row) => worksheet.addRow(row));
    worksheet.getRow(1).font = { bold: true };
    const buffer = await workbook.xlsx.writeBuffer();
    return new Response(buffer, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": "attachment; filename=morepower2you-inventory.xlsx",
      },
    });
  }

  const headers = Object.keys(rows[0] || { Product: "", SKU: "", Studio: "" });
  const csv = [headers.map(csvEscape).join(","), ...rows.map((row) => headers.map((header) => csvEscape(row[header as keyof typeof row])).join(","))].join("\n");
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=morepower2you-inventory.csv",
    },
  });
}
