import { DashboardView } from "@/components/inventory/views";

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const params = await searchParams;
  return <DashboardView search={params.q} />;
}
