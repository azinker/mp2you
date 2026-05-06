"use client";

import Link from "next/link";
import { useActionState } from "react";
import { acceptInviteAction, forgotPasswordAction, loginAction, resetPasswordAction } from "@/lib/inventory/actions";
import { HelpTooltip } from "@/components/inventory/help-tooltip";

export function AuthFrame({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="inventory-auth">
      <section className="inventory-auth-card">
        <div className="inventory-auth-mark">MP2Y</div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        {children}
      </section>
    </div>
  );
}

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, undefined);
  return (
    <form action={action} className="inventory-form single">
      {state?.error ? <p className="inventory-error">{state.error}</p> : null}
      <label className="inventory-field">
        <span>Email <HelpTooltip k="email" /></span>
        <input name="email" type="email" required autoComplete="email" />
      </label>
      <label className="inventory-field">
        <span>Password <HelpTooltip k="password" /></span>
        <input name="password" type="password" required autoComplete="current-password" />
      </label>
      <label className="inventory-checkbox">
        <input name="remember" type="checkbox" defaultChecked />
        <span>Remember me for 30 days</span>
      </label>
      <button className="inventory-primary" type="submit" disabled={pending}>{pending ? "Signing in..." : "Sign in"}</button>
      <Link href="/inventory/forgot-password" className="inventory-muted-link">Forgot password?</Link>
    </form>
  );
}

export function ForgotPasswordForm() {
  const [state, action, pending] = useActionState(forgotPasswordAction, undefined);
  return (
    <form action={action} className="inventory-form single">
      {state?.success ? <p className="inventory-success">{state.success}</p> : null}
      <label className="inventory-field">
        <span>Email <HelpTooltip k="email" /></span>
        <input name="email" type="email" required />
      </label>
      <button className="inventory-primary" type="submit" disabled={pending}>Send reset link</button>
      <Link href="/inventory/login" className="inventory-muted-link">Back to login</Link>
    </form>
  );
}

export function ResetPasswordForm({ token }: { token: string }) {
  const [state, action, pending] = useActionState(resetPasswordAction, undefined);
  return (
    <form action={action} className="inventory-form single">
      {state?.error ? <p className="inventory-error">{state.error}</p> : null}
      {state?.success ? <p className="inventory-success">{state.success}</p> : null}
      <input type="hidden" name="token" value={token} />
      <label className="inventory-field">
        <span>New password <HelpTooltip k="password" /></span>
        <input name="password" type="password" required minLength={8} />
      </label>
      <button className="inventory-primary" type="submit" disabled={pending}>Reset password</button>
    </form>
  );
}

export function AcceptInviteForm({ token }: { token: string }) {
  const [state, action, pending] = useActionState(acceptInviteAction, undefined);
  return (
    <form action={action} className="inventory-form single">
      {state?.error ? <p className="inventory-error">{state.error}</p> : null}
      <input type="hidden" name="token" value={token} />
      <label className="inventory-field">
        <span>Create password <HelpTooltip k="password" /></span>
        <input name="password" type="password" required minLength={8} />
      </label>
      <button className="inventory-primary" type="submit" disabled={pending}>Accept invite</button>
    </form>
  );
}
