# Next Steps: Email, Spam Protection, Form Test, Vercel Preview

Use this file as the simple checklist for the next phase.

Do not paste secret keys into chat. Paste them only into `.env.local` locally and later into Vercel Environment Variables.

## File To Edit Locally

Open:

```bash
.env.local
```

You only need to fill these next:

```bash
RESEND_API_KEY=
CONTACT_FORM_TO_EMAIL=
CONTACT_FORM_BCC_EMAIL=
CONTACT_FORM_FROM_EMAIL=MorePower2You <onboarding@resend.dev>

NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
```

Leave the Sanity values as they are.

## Step 1: Resend Email Key

Go to:

```bash
https://resend.com/api-keys
```

Then:

1. Sign in or create a Resend account.
2. Click `Create API Key`.
3. Name it:

```bash
MorePower2You Contact Form
```

4. Choose `Sending access` if Resend offers that option. `Full access` also works for setup, but `Sending access` is cleaner.
5. Copy the API key. You will only see it once.
6. Paste it into `.env.local`:

```bash
RESEND_API_KEY=paste_resend_key_here
```

7. Pick the inbox that should receive form leads and paste it here:

```bash
CONTACT_FORM_TO_EMAIL=Laurie@morepower2you.com
```

8. Add Eli as the internal BCC recipient:

```bash
CONTACT_FORM_BCC_EMAIL=eli@morepower2you.com
```

9. Keep this for local testing:

```bash
CONTACT_FORM_FROM_EMAIL=MorePower2You <onboarding@resend.dev>
```

After the `morepower2you.com` sending domain is verified in Resend, this can become:

```bash
CONTACT_FORM_FROM_EMAIL=MorePower2You <contact@morepower2you.com>
```

Resend allows sending from any address at a verified domain, even if that exact mailbox was not separately created, but it is better to use an address that can receive replies.

## Step 2: Cloudflare Turnstile Keys

Go to:

```bash
https://dash.cloudflare.com
```

Then:

1. Sign in or create a Cloudflare account.
2. In the left menu, find `Turnstile`.
3. Click `Add widget`.
4. Widget name:

```bash
MorePower2You Contact Form Local
```

5. Widget mode: choose `Managed`.
6. Hostnames: add these for local testing:

```bash
localhost
127.0.0.1
```

Do not include `http://` or `:3000` if Cloudflare asks for hostnames.

7. Create/save the widget.
8. Copy the `Site Key`.
9. Paste it into `.env.local`:

```bash
NEXT_PUBLIC_TURNSTILE_SITE_KEY=paste_site_key_here
```

10. Copy the `Secret Key`.
11. Paste it into `.env.local`:

```bash
TURNSTILE_SECRET_KEY=paste_secret_key_here
```

## Step 3: Tell Codex To Test The Form

After saving `.env.local`, say:

```bash
Done, test the form
```

Codex should then:

1. Restart localhost so the new env values load.
2. Run:

```bash
npm run cms:check
```

3. Open:

```bash
http://localhost:3000/contact
```

4. Submit a test inquiry.
5. Confirm:
   - the browser shows the thank-you message
   - the lead appears in Sanity under `Contact / project inquiry submissions`
   - the internal email arrives at `CONTACT_FORM_TO_EMAIL`
   - the visitor autoresponder arrives at the test visitor email

## Step 4: Vercel Preview

Vercel preview comes after the local form test passes.

### First-time Vercel setup

Go to:

```bash
https://vercel.com/new
```

Then:

1. Sign in with GitHub, GitLab, or Bitbucket.
2. Import the MorePower2You repository.
3. Framework preset: `Next.js`.
4. Build command:

```bash
npm run build
```

5. Add Environment Variables in Vercel Project Settings.

### Vercel variables to add

Add the same values from `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=
SANITY_PREVIEW_SECRET=
NEXT_PUBLIC_USE_SANITY=true
RESEND_API_KEY=
CONTACT_FORM_TO_EMAIL=
CONTACT_FORM_BCC_EMAIL=
CONTACT_FORM_FROM_EMAIL=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
```

For the first preview, `NEXT_PUBLIC_SITE_URL` can be the Vercel preview URL. After final approval and DNS cutover, change it to:

```bash
https://www.morepower2you.com
```

### After Vercel gives a preview URL

Copy the Vercel preview URL, then update:

1. Sanity CORS:
   - Add the full preview URL, like `https://your-preview.vercel.app`
   - Enable credentials if Sanity asks.

2. Cloudflare Turnstile:
   - Add the preview hostname only, like `your-preview.vercel.app`

3. Resend:
   - Keep test sender for preview if it works.
   - Before production, verify a real sender domain.

4. Redeploy Vercel after env/domain changes.

## Official References

- Resend API keys: https://resend.com/docs/dashboard/api-keys/introduction
- Cloudflare Turnstile get started: https://developers.cloudflare.com/turnstile/get-started/
- Vercel environment variables: https://vercel.com/docs/environment-variables
