"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  BarChart3,
  Boxes,
  Building2,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  SunMoon,
} from "lucide-react";
import { logoutAction } from "@/lib/inventory/actions";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/inventory/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/inventory/studios", label: "Studios", icon: Building2 },
  { href: "/inventory/products", label: "Products", icon: Package },
  { href: "/inventory/activity", label: "Activity", icon: Activity },
  { href: "/inventory/reports", label: "Reports", icon: BarChart3 },
  { href: "/inventory/settings", label: "Settings", icon: Settings },
];

export function InventoryAppShell({
  user,
  children,
}: {
  user: { firstName: string; lastName: string; email: string; avatarUrl?: string | null; themePreference: string };
  children: React.ReactNode;
}) {
  const pathname = usePathname() || "";
  const initials = `${user.firstName[0] || ""}${user.lastName[0] || ""}`.toUpperCase();

  return (
    <div className="inventory-root" data-theme={user.themePreference.toLowerCase()}>
      <aside className="inventory-sidebar">
        <Link href="/inventory/dashboard" className="inventory-brand" aria-label="Inventory dashboard">
          <Boxes size={26} />
          <span>
            <strong>MorePower2You</strong>
            <small>Inventory Portal</small>
          </span>
        </Link>
        <nav aria-label="Inventory navigation">
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className={cn("inventory-nav-link", pathname.startsWith(item.href) && "active")}>
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="inventory-sidebar-footer">
          <Link href="/inventory/settings/profile" className="inventory-user-pill">
            {user.avatarUrl ? <img src={user.avatarUrl} alt="" /> : <span>{initials}</span>}
            <span>
              <strong>{user.firstName} {user.lastName}</strong>
              <small>{user.email}</small>
            </span>
          </Link>
          <div className="inventory-sidebar-actions">
            <Link href="/inventory/settings/profile" className="inventory-icon-button" title="Theme preference">
              <SunMoon size={18} />
            </Link>
            <form action={logoutAction}>
              <button className="inventory-icon-button" type="submit" title="Log out">
                <LogOut size={18} />
              </button>
            </form>
          </div>
        </div>
      </aside>
      <main className="inventory-main">{children}</main>
    </div>
  );
}
