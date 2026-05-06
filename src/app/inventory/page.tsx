import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/inventory/auth";

export const dynamic = "force-dynamic";

export default async function InventoryIndexPage() {
  const user = await getSessionUser();
  redirect(user ? "/inventory/dashboard" : "/inventory/login");
}
