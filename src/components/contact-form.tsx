"use client";

import Script from "next/script";
import { Send } from "lucide-react";
import { FormEvent, useState } from "react";
import type { Locale } from "@/content/site";

const copy = {
  en: {
    name: "Name",
    company: "Company",
    email: "Email",
    projectType: "Project type",
    industry: "Industry",
    occasion: "Gifting occasion",
    scale: "Estimated recipients / project scale",
    timeline: "Timeline / deadline",
    customization: "Customization or branding needs",
    destinations: "Shipping destinations or destination count",
    message: "Message / project details",
    consent: "I understand this form is for custom project inquiry and that MorePower2You may follow up about next steps.",
    submit: "Send Project Inquiry",
    success: "Your gifting project request has been received. We’ll review the details and follow up with next steps.",
    error: "Something prevented the request from sending. Please review the fields and try again.",
    required: "Required",
    turnstileDev: "Spam protection will appear here when a Turnstile site key is configured.",
  },
  he: {
    name: "שם",
    company: "חברה",
    email: "אימייל",
    projectType: "סוג פרויקט",
    industry: "תעשייה",
    occasion: "אירוע המתנה",
    scale: "היקף משוער / מספר מקבלים",
    timeline: "לוח זמנים / דדליין",
    customization: "צרכי התאמה או מיתוג",
    destinations: "יעדי משלוח או מספר יעדים",
    message: "פרטי הפרויקט",
    consent: "ברור לי שזהו טופס פנייה לפרויקט מותאם וש-MorePower2You עשויה לחזור אליי לגבי הצעדים הבאים.",
    submit: "שליחת פנייה",
    success: "בקשת פרויקט המתנות התקבלה. נבחן את הפרטים ונחזור עם הצעדים הבאים.",
    error: "משהו מנע את שליחת הפנייה. בדקו את השדות ונסו שוב.",
    required: "חובה",
    turnstileDev: "הגנת הספאם תופיע כאן כאשר יוגדר מפתח Turnstile.",
  },
};

const options = {
  projectType: ["Corporate gifting campaign", "Custom branded gift boxes", "Concierge project", "Fulfillment / warehousing", "Gaming & VIP player gifting", "Other custom project"],
  industry: ["Gaming", "Technology", "Real estate", "Finance", "Hospitality", "Healthcare", "Events", "Marketing / HR / Operations", "Other"],
  occasion: ["Holiday / Christmas", "Birthday", "Easter / seasonal", "Client appreciation", "VIP player / customer appreciation", "Employee appreciation", "Event", "Product launch", "Milestone", "Loyalty program", "Other"],
};

export function ContactForm({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { ok?: boolean; message?: string };
      if (!response.ok || !result.ok) throw new Error(result.message || t.error);

      setStatus("success");
      form.reset();
    } catch (submitError) {
      setStatus("error");
      setError(submitError instanceof Error ? submitError.message : t.error);
    }
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      {siteKey ? <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" /> : null}
      <div className="form-grid">
        <Field id="name" label={t.name} requiredText={t.required} />
        <Field id="company" label={t.company} requiredText={t.required} />
        <Field id="email" label={t.email} requiredText={t.required} type="email" />
        <Select id="projectType" label={t.projectType} requiredText={t.required} values={options.projectType} />
        <Select id="industry" label={t.industry} requiredText={t.required} values={options.industry} />
        <Select id="occasion" label={t.occasion} requiredText={t.required} values={options.occasion} />
        <Field id="scale" label={t.scale} requiredText={t.required} />
        <Field id="timeline" label={t.timeline} requiredText={t.required} />
        <Field id="customization" label={t.customization} requiredText={t.required} />
        <Field id="destinations" label={t.destinations} requiredText={t.required} />
      </div>
      <label className="field field-full" htmlFor="message">
        <span>
          {t.message} <em>{t.required}</em>
        </span>
        <textarea id="message" name="message" rows={6} required />
      </label>
      <label className="consent-row">
        <input name="consent" type="checkbox" value="accepted" required />
        <span>{t.consent}</span>
      </label>
      <div className="turnstile-slot">
        {siteKey ? <div className="cf-turnstile" data-sitekey={siteKey} /> : <span>{t.turnstileDev}</span>}
      </div>
      <button className="button button-primary form-submit" type="submit" disabled={status === "loading"} data-track="contact-form-submit">
        <Send size={17} aria-hidden="true" />
        {status === "loading" ? "..." : t.submit}
      </button>
      {status === "success" ? <p className="form-success">{t.success}</p> : null}
      {status === "error" ? <p className="form-error">{error || t.error}</p> : null}
    </form>
  );
}

function Field({
  id,
  label,
  requiredText,
  type = "text",
}: {
  id: string;
  label: string;
  requiredText: string;
  type?: string;
}) {
  return (
    <label className="field" htmlFor={id}>
      <span>
        {label} <em>{requiredText}</em>
      </span>
      <input id={id} name={id} type={type} required />
    </label>
  );
}

function Select({ id, label, values, requiredText }: { id: string; label: string; values: string[]; requiredText: string }) {
  return (
    <label className="field" htmlFor={id}>
      <span>
        {label} <em>{requiredText}</em>
      </span>
      <select id={id} name={id} required>
        <option value="" />
        {values.map((value) => (
          <option value={value} key={value}>
            {value}
          </option>
        ))}
      </select>
    </label>
  );
}
