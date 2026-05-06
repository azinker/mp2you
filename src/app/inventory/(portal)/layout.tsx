import { InventoryAppShell } from "@/components/inventory/app-shell";
import { requireInventoryUser } from "@/lib/inventory/auth";

export const dynamic = "force-dynamic";

export default async function InventoryPortalLayout({ children }: { children: React.ReactNode }) {
  const user = await requireInventoryUser();
  return <InventoryAppShell user={user}>{children}</InventoryAppShell>;
}
