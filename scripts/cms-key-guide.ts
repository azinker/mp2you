import { envItems, groupEnvItems } from "./cms-utils";

console.log("MorePower2You CMS/API key guide");
console.log("Add these values to `.env.local` for local work and to Vercel Project Settings > Environment Variables for preview/production.\n");

console.log("1. Sanity CMS");
console.log("   - Go to https://www.sanity.io/manage");
console.log("   - Create or open the MorePower2You project.");
console.log("   - Copy the Project ID from the project settings.");
console.log("   - Use dataset `production` unless you intentionally create another dataset.");
console.log("   - Go to API > Tokens > Add API token.");
console.log("   - Name it `MorePower2You site write token` and choose Editor permissions.");
console.log("   - Copy the token once and save it as SANITY_API_TOKEN.");
console.log("   - Go to API > CORS origins and add:");
console.log("     http://localhost:3000");
console.log("     your Vercel preview URL when available");
console.log("     https://morepower2you.com after final approval/cutover\n");

console.log("2. Resend email");
console.log("   - Go to https://resend.com/api-keys");
console.log("   - Create an API key and save it as RESEND_API_KEY.");
console.log("   - Set CONTACT_FORM_TO_EMAIL to the inbox that should receive leads.");
console.log("   - For testing, CONTACT_FORM_FROM_EMAIL can stay `MorePower2You <onboarding@resend.dev>`.");
console.log("   - Before production, verify a sending domain in Resend and switch CONTACT_FORM_FROM_EMAIL to that domain.\n");

console.log("3. Cloudflare Turnstile");
console.log("   - Go to https://dash.cloudflare.com");
console.log("   - Open Turnstile > Add widget.");
console.log("   - Use a managed widget and add localhost plus the preview/final domains.");
console.log("   - Save the site key as NEXT_PUBLIC_TURNSTILE_SITE_KEY.");
console.log("   - Save the secret key as TURNSTILE_SECRET_KEY.\n");

console.log("Environment variable reference:");

for (const [group, items] of Object.entries(groupEnvItems())) {
  if (!items.length) continue;
  console.log(`\n${group}`);
  for (const item of items) {
    const secret = item.isSecret ? " secret" : "";
    console.log(`  - ${item.key}${secret}: ${item.notes}`);
  }
}

const orderedKeys = envItems.map((item) => item.key);
console.log(`\nTotal variables documented: ${orderedKeys.length}`);
