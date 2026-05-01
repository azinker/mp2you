import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

export type EnvGroup = "Sanity CMS" | "Email" | "Spam Protection" | "Site";

export type EnvItem = {
  key: string;
  group: EnvGroup;
  requiredFor: string;
  notes: string;
  isSecret?: boolean;
};

export const envItems: EnvItem[] = [
  {
    key: "NEXT_PUBLIC_SITE_URL",
    group: "Site",
    requiredFor: "SEO, sitemap, canonical URLs, OG URLs",
    notes: "Use http://localhost:3000 locally, the Vercel preview URL for staging, and https://morepower2you.com after approved cutover.",
  },
  {
    key: "NEXT_PUBLIC_SANITY_PROJECT_ID",
    group: "Sanity CMS",
    requiredFor: "Studio connection and content reads",
    notes: "Copy from Sanity Manage > project > Settings.",
  },
  {
    key: "NEXT_PUBLIC_SANITY_DATASET",
    group: "Sanity CMS",
    requiredFor: "Studio connection and content reads",
    notes: "Usually production.",
  },
  {
    key: "SANITY_API_TOKEN",
    group: "Sanity CMS",
    requiredFor: "Seeding content and storing contact submissions",
    notes: "Create a token in Sanity Manage > project > API > Tokens with Editor permission.",
    isSecret: true,
  },
  {
    key: "SANITY_PREVIEW_SECRET",
    group: "Sanity CMS",
    requiredFor: "Future preview/draft mode",
    notes: "Any long random value you create and store in Vercel env vars.",
    isSecret: true,
  },
  {
    key: "NEXT_PUBLIC_USE_SANITY",
    group: "Sanity CMS",
    requiredFor: "Switching frontend reads from static fallback to CMS-backed content",
    notes: "Keep false until the Sanity project is created and seeded.",
  },
  {
    key: "RESEND_API_KEY",
    group: "Email",
    requiredFor: "Internal inquiry email and visitor autoresponder",
    notes: "Create at Resend > API Keys.",
    isSecret: true,
  },
  {
    key: "CONTACT_FORM_TO_EMAIL",
    group: "Email",
    requiredFor: "Where project inquiries are sent",
    notes: "Use the business inbox that should receive leads.",
  },
  {
    key: "CONTACT_FORM_BCC_EMAIL",
    group: "Email",
    requiredFor: "Optional internal BCC on lead notifications",
    notes: "Use when a second internal inbox should silently receive lead copies.",
  },
  {
    key: "CONTACT_FORM_FROM_EMAIL",
    group: "Email",
    requiredFor: "Sender address for form emails",
    notes: "Use onboarding@resend.dev for testing, then a verified domain sender before launch.",
  },
  {
    key: "NEXT_PUBLIC_TURNSTILE_SITE_KEY",
    group: "Spam Protection",
    requiredFor: "Visible Turnstile widget on the form",
    notes: "Create at Cloudflare Dashboard > Turnstile.",
  },
  {
    key: "TURNSTILE_SECRET_KEY",
    group: "Spam Protection",
    requiredFor: "Server-side Turnstile verification",
    notes: "Copy the secret key from the same Cloudflare Turnstile widget.",
    isSecret: true,
  },
];

export function loadLocalEnv(cwd = process.cwd()) {
  for (const filename of [".env.local", ".env"]) {
    const filePath = path.join(cwd, filename);
    if (!existsSync(filePath)) continue;

    const lines = readFileSync(filePath, "utf8").split(/\r?\n/);
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;

      const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
      if (!match) continue;

      const [, key, rawValue] = match;
      const value = rawValue.trim().replace(/^["']|["']$/g, "");
      if (process.env[key] === undefined) {
        process.env[key] = value;
      }
    }
  }
}

export function statusFor(key: string) {
  const value = process.env[key];
  if (!value || !value.trim()) return false;

  const normalized = value.trim().toLowerCase();
  return !(
    normalized.startsWith("paste_") ||
    normalized.includes("_here") ||
    normalized.startsWith("change-this")
  );
}

export function groupEnvItems() {
  return envItems.reduce<Record<EnvGroup, EnvItem[]>>(
    (groups, item) => {
      groups[item.group].push(item);
      return groups;
    },
    {
      Site: [],
      "Sanity CMS": [],
      Email: [],
      "Spam Protection": [],
    },
  );
}

export function requiredCmsKeys() {
  return ["NEXT_PUBLIC_SANITY_PROJECT_ID", "NEXT_PUBLIC_SANITY_DATASET", "SANITY_API_TOKEN"];
}
