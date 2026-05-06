import { AuthFrame, ResetPasswordForm } from "@/components/inventory/auth-forms";

export default async function ResetPasswordPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const params = await searchParams;
  return (
    <AuthFrame title="Choose a new password" subtitle="Use the reset link from your email to set a new password.">
      <ResetPasswordForm token={params.token || ""} />
    </AuthFrame>
  );
}
