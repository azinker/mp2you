export const inventoryHelp = {
  email: "Use the user's work email address. Invites, password resets, and reports are sent here.",
  password: "Use a secure password. The seeded admin can change the temporary password in Settings.",
  firstName: "Required for audit logs and report lines so teammates can see who made each change.",
  lastName: "Required for audit logs and user management.",
  studioName: "The Studio this inventory belongs to. Example: Slotomania.",
  studioRep: "The main contact for this Studio.",
  productName: "The item name shown in dashboards, reports, and inventory history.",
  sku: "Optional internal code. If blank, the system creates a clean MorePower2You SKU.",
  piecesPerCarton:
    "Enter how many individual units are inside one full carton. Example: if one carton contains 6 ice cream machines, enter 6.",
  quantityPieces:
    "Inventory is tracked as individual pieces. Cartons and loose pieces are calculated automatically.",
  initialCount: "Use this when starting inventory for a product. Example: 10 cartons x 5 pieces = 50 pieces.",
  addInventory: "Use this when new pieces arrive into stock.",
  removeInventory:
    "Use this when inventory leaves stock. Example: Laurie Zinker removes 50 pieces because they were shipped to a Studio.",
  transferInventory:
    "Move pieces from one Studio or location to another while keeping both balances in the audit trail.",
  correction:
    "Use this only to correct a mistake while preserving history. Example: inventory was counted as 100 pieces but should have been 96.",
  unitCost: "Current cost per individual piece. Cost value on hand is total pieces on hand x unit cost.",
  unitSalePrice: "Current sale price per individual piece. Sale value on hand is total pieces on hand x unit sale price.",
  lowStockThreshold: "Optional alert point. Low Stock means above 0 but at or below this threshold.",
  costValue: "Calculated automatically as total pieces on hand x unit cost.",
  saleValue: "Calculated automatically as total pieces on hand x unit sale price.",
  inviteUser: "Send an invite email so a teammate can verify email and set a password.",
  archive: "Archives the record without deleting audit history. Type confirmation is required for major archives.",
  weeklyReport: "Preview or send the current weekly snapshot. Manual sends do not cancel Friday's scheduled email.",
  exportData: "Download filtered inventory, Studio, product, and activity data as CSV or XLSX.",
  imageUpload: "Optional image. Accepted types: JPG, PNG, WebP, GIF. Files upload to Cloudflare R2.",
};

export type InventoryHelpKey = keyof typeof inventoryHelp;
