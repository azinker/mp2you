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
    projectType: "סוג הפרויקט",
    industry: "תחום",
    occasion: "מטרת המתנה",
    scale: "מספר מקבלים / היקף משוער",
    timeline: "לוח זמנים / תאריך יעד",
    customization: "מיתוג והתאמה אישית",
    destinations: "יעדי משלוח / מספר יעדים",
    message: "פרטי הפרויקט",
    consent: "ברור לי שזהו טופס פנייה לפרויקט מותאם, ו-MorePower2You עשויה לחזור אליי לגבי המשך התהליך.",
    submit: "שליחת פנייה",
    success: "קיבלנו את הפנייה. נבדוק את הפרטים ונחזור אליכם עם הצעד הבא.",
    error: "לא הצלחנו לשלוח את הפנייה. בדקו את השדות ונסו שוב.",
    required: "חובה",
    turnstileDev: "כאן תופיע הגנת הספאם לאחר הגדרת מפתח Turnstile.",
  },
};

type SelectOption = {
  value: string;
  label: string;
};

const options = {
  en: {
    projectType: [
      "Corporate gifting campaign",
      "Custom branded gift boxes",
      "Concierge project",
      "Fulfillment / warehousing",
      "Gaming & VIP player gifting",
      "Other custom project",
    ].map((value) => ({ value, label: value })),
    industry: ["Gaming", "Technology", "Real estate", "Finance", "Hospitality", "Healthcare", "Events", "Marketing / HR / Operations", "Other"].map((value) => ({
      value,
      label: value,
    })),
    occasion: [
      "Holiday / Christmas",
      "Birthday",
      "Easter / seasonal",
      "Client appreciation",
      "VIP player / customer appreciation",
      "Employee appreciation",
      "Event",
      "Product launch",
      "Milestone",
      "Loyalty program",
      "Other",
    ].map((value) => ({ value, label: value })),
  },
  he: {
    projectType: [
      { value: "Corporate gifting campaign", label: "קמפיין מתנות ארגוניות" },
      { value: "Custom branded gift boxes", label: "קופסאות מתנה ממותגות" },
      { value: "Concierge project", label: "פרויקט קונסיירז'" },
      { value: "Fulfillment / warehousing", label: "אחסון, הרכבה ושילוח" },
      { value: "Gaming & VIP player gifting", label: "גיימינג ומתנות לשחקני VIP" },
      { value: "Other custom project", label: "פרויקט מותאם אחר" },
    ],
    industry: [
      { value: "Gaming", label: "גיימינג" },
      { value: "Technology", label: "טכנולוגיה" },
      { value: "Real estate", label: "נדל\"ן" },
      { value: "Finance", label: "פיננסים" },
      { value: "Hospitality", label: "אירוח ומלונאות" },
      { value: "Healthcare", label: "בריאות" },
      { value: "Events", label: "אירועים" },
      { value: "Marketing / HR / Operations", label: "שיווק / HR / תפעול" },
      { value: "Other", label: "אחר" },
    ],
    occasion: [
      { value: "Holiday / Christmas", label: "חגים / כריסמס" },
      { value: "Birthday", label: "יום הולדת" },
      { value: "Easter / seasonal", label: "איסטר / עונה מיוחדת" },
      { value: "Client appreciation", label: "הוקרת לקוחות" },
      { value: "VIP player / customer appreciation", label: "הוקרת שחקני VIP / לקוחות" },
      { value: "Employee appreciation", label: "הוקרת עובדים" },
      { value: "Event", label: "אירוע" },
      { value: "Product launch", label: "השקת מוצר" },
      { value: "Milestone", label: "אבן דרך" },
      { value: "Loyalty program", label: "תוכנית נאמנות" },
      { value: "Other", label: "אחר" },
    ],
  },
};

export function ContactForm({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const selectOptions = options[locale];
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
        <Select id="projectType" label={t.projectType} requiredText={t.required} values={selectOptions.projectType} />
        <Select id="industry" label={t.industry} requiredText={t.required} values={selectOptions.industry} />
        <Select id="occasion" label={t.occasion} requiredText={t.required} values={selectOptions.occasion} />
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

function Select({ id, label, values, requiredText }: { id: string; label: string; values: SelectOption[]; requiredText: string }) {
  return (
    <label className="field" htmlFor={id}>
      <span>
        {label} <em>{requiredText}</em>
      </span>
      <select id={id} name={id} required>
        <option value="" />
        {values.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
