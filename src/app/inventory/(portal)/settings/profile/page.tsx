import { SettingsView } from "@/components/inventory/views";
import { requireInventoryUser } from "@/lib/inventory/auth";

export default async function ProfileSettingsPage() {
  const user = await requireInventoryUser();
  return <SettingsView user={user} section="profile" />;
}
