import { StudioDetailView } from "@/components/inventory/views";

export default async function StudioDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <StudioDetailView id={id} />;
}
