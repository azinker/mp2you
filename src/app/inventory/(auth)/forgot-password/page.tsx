import { AuthFrame, ForgotPasswordForm } from "@/components/inventory/auth-forms";

export default function ForgotPasswordPage() {
  return (
    <AuthFrame title="Reset password" subtitle="Request a secure password reset link by email.">
      <ForgotPasswordForm />
    </AuthFrame>
  );
}
