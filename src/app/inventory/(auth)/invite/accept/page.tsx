import { AuthFrame, AcceptInviteForm } from "@/components/inventory/auth-forms";

export default async function AcceptInvitePage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const params = await searchParams;
  return (
    <AuthFrame title="Accept invite" subtitle="Verify your invite and create your Inventory Portal password.">
      <AcceptInviteForm token={params.token || ""} />
    </AuthFrame>
  );
}
