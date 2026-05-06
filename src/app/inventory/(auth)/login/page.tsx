import { AuthFrame, LoginForm } from "@/components/inventory/auth-forms";
import { redirectIfLoggedIn } from "@/lib/inventory/auth";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  await redirectIfLoggedIn();
  return (
    <AuthFrame title="Inventory Portal" subtitle="Sign in to manage MorePower2You Studio inventory.">
      <LoginForm />
    </AuthFrame>
  );
}
