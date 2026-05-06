import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { db } from "@/lib/inventory/db";

const SESSION_COOKIE = "mp2y_inventory_session";
const THIRTY_DAYS_SECONDS = 60 * 60 * 24 * 30;

const loginAttempts = new Map<string, { count: number; resetAt: number }>();

function authSecret() {
  const secret = process.env.AUTH_SECRET || process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET or SESSION_SECRET is required for inventory auth.");
  }
  return new TextEncoder().encode(secret);
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function createSession(userId: string, remember = true) {
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(remember ? "30d" : "12h")
    .sign(authSecret());

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/inventory",
    maxAge: remember ? THIRTY_DAYS_SECONDS : 60 * 60 * 12,
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getSessionUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  try {
    const verified = await jwtVerify(token, authSecret());
    const userId = String(verified.payload.userId || "");
    if (!userId) return null;
    return db.user.findFirst({
      where: { id: userId, status: "ACTIVE" },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        avatarUrl: true,
        reportOptIn: true,
        themePreference: true,
        isOriginalAdmin: true,
      },
    });
  } catch {
    return null;
  }
}

export async function requireInventoryUser() {
  const user = await getSessionUser();
  if (!user) redirect("/inventory/login");
  return user;
}

export async function redirectIfLoggedIn() {
  const user = await getSessionUser();
  if (user) redirect("/inventory/dashboard");
}

export function checkLoginRateLimit(key: string) {
  const now = Date.now();
  const current = loginAttempts.get(key);
  if (!current || current.resetAt < now) {
    loginAttempts.set(key, { count: 1, resetAt: now + 15 * 60 * 1000 });
    return true;
  }
  if (current.count >= 8) return false;
  current.count += 1;
  return true;
}

export function clearLoginRateLimit(key: string) {
  loginAttempts.delete(key);
}
