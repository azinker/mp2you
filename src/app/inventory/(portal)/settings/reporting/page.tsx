import { SettingsView } from "@/components/inventory/views";
import { requireInventoryUser } from "@/lib/inventory/auth";

export default async function ReportingSettingsPage() {
  const user = await requireInventoryUser();
  return <SettingsView user={user} section="reporting" />;
}
