import { Info } from "lucide-react";
import { inventoryHelp, type InventoryHelpKey } from "@/lib/inventory/help";

export function HelpTooltip({ k, text }: { k?: InventoryHelpKey; text?: string }) {
  const body = text || (k ? inventoryHelp[k] : "");
  if (!body) return null;
  return (
    <span className="inventory-help" tabIndex={0} aria-label={body}>
      <Info size={14} aria-hidden="true" />
      <span role="tooltip">{body}</span>
    </span>
  );
}
