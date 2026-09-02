"use client";

import Script from "next/script";
import { Send } from "lucide-react";
import { FormEvent, useState } from "react";
import type { Locale } from "@/content/site";

type FormCopy = {
  name: string;
  company: string;
  email: string;
  projectType: string;
  industry: string;
  occasion: string;
  scale: string;
  timeline: string;
  customization: string;
  destinations: string;
  message: string;
  consent: string;
  submit: string;
  success: string;
  error: string;
  required: string;
  turnstileDev: string;
};

const copy: Record<Locale, FormCopy> = {
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
    success: "Your gifting project request has been received. We'll review the details and follow up with next steps.",
    error: "Something prevented the request from sending. Please review the fields and try again.",
    required: "Required",
    turnstileDev: "Spam protection will appear here when a Turnstile site key is configured.",
  },
  es: {
    name: "Nombre",
    company: "Empresa",
    email: "Correo",
    projectType: "Tipo de proyecto",
    industry: "Sector",
    occasion: "Ocasión del regalo",
    scale: "Destinatarios estimados / escala",
    timeline: "Plazo / fecha límite",
    customization: "Personalización o marca",
    destinations: "Destinos de envío o número de destinos",
    message: "Mensaje / detalles del proyecto",
    consent: "Entiendo que este formulario es para una consulta de proyecto y que MorePower2You puede contactarme sobre los siguientes pasos.",
    submit: "Enviar consulta",
    success: "Hemos recibido su solicitud. Revisaremos los detalles y le contactaremos con el siguiente paso.",
    error: "No se pudo enviar la solicitud. Revise los campos e inténtelo de nuevo.",
    required: "Obligatorio",
    turnstileDev: "La protección antispam aparecerá aquí cuando haya una clave de Turnstile.",
  },
  fr: {
    name: "Nom",
    company: "Entreprise",
    email: "E-mail",
    projectType: "Type de projet",
    industry: "Secteur",
    occasion: "Occasion du cadeau",
    scale: "Destinataires estimés / envergure",
    timeline: "Calendrier / échéance",
    customization: "Personnalisation ou branding",
    destinations: "Destinations d’expédition ou nombre de destinations",
    message: "Message / détails du projet",
    consent: "Je comprends que ce formulaire sert à une demande de projet et que MorePower2You peut me recontacter pour la suite.",
    submit: "Envoyer la demande",
    success: "Votre demande a bien été reçue. Nous examinerons les détails et reviendrons vers vous.",
    error: "L’envoi n’a pas abouti. Vérifiez les champs et réessayez.",
    required: "Obligatoire",
    turnstileDev: "La protection anti-spam apparaîtra ici lorsqu’une clé Turnstile sera configurée.",
  },
  de: {
    name: "Name",
    company: "Unternehmen",
    email: "E-Mail",
    projectType: "Projektart",
    industry: "Branche",
    occasion: "Anlass",
    scale: "Geschätzte Empfänger / Umfang",
    timeline: "Zeitplan / Frist",
    customization: "Anpassung oder Branding",
    destinations: "Versandziele oder Anzahl der Ziele",
    message: "Nachricht / Projektdetails",
    consent: "Ich verstehe, dass dieses Formular einer Projektanfrage dient und MorePower2You sich zu den nächsten Schritten melden kann.",
    submit: "Anfrage senden",
    success: "Ihre Anfrage ist eingegangen. Wir prüfen die Angaben und melden uns mit dem nächsten Schritt.",
    error: "Die Anfrage konnte nicht gesendet werden. Bitte prüfen Sie die Felder und versuchen Sie es erneut.",
    required: "Pflichtfeld",
    turnstileDev: "Der Spamschutz erscheint hier, sobald ein Turnstile-Schlüssel hinterlegt ist.",
  },
  pt: {
    name: "Nome",
    company: "Empresa",
    email: "E-mail",
    projectType: "Tipo de projeto",
    industry: "Setor",
    occasion: "Ocasião do presente",
    scale: "Destinatários estimados / escala",
    timeline: "Prazo / data limite",
    customization: "Personalização ou branding",
    destinations: "Destinos de envio ou número de destinos",
    message: "Mensagem / detalhes do projeto",
    consent: "Compreendo que este formulário é para um pedido de projeto e que a MorePower2You pode contactar-me sobre os próximos passos.",
    submit: "Enviar pedido",
    success: "O seu pedido foi recebido. Vamos rever os detalhes e contactá-lo com o próximo passo.",
    error: "Não foi possível enviar o pedido. Reveja os campos e tente novamente.",
    required: "Obrigatório",
    turnstileDev: "A proteção antispam aparecerá aqui quando existir uma chave Turnstile.",
  },
  zh: {
    name: "姓名",
    company: "公司",
    email: "邮箱",
    projectType: "项目类型",
    industry: "行业",
    occasion: "礼赠场合",
    scale: "预计人数 / 项目规模",
    timeline: "时间 / 截止日期",
    customization: "定制或品牌需求",
    destinations: "配送目的地或目的地数量",
    message: "留言 / 项目详情",
    consent: "我理解此表单用于定制项目咨询，MorePower2You 可能会就后续步骤与我联系。",
    submit: "发送项目咨询",
    success: "我们已收到您的礼赠项目需求，会审阅细节并跟进下一步。",
    error: "请求未能发送。请检查字段后重试。",
    required: "必填",
    turnstileDev: "配置 Turnstile 站点密钥后，此处将显示垃圾信息防护。",
  },
  ar: {
    name: "الاسم",
    company: "الشركة",
    email: "البريد الإلكتروني",
    projectType: "نوع المشروع",
    industry: "القطاع",
    occasion: "مناسبة الإهداء",
    scale: "عدد المستلمين / حجم المشروع",
    timeline: "الجدول / الموعد النهائي",
    customization: "التخصيص أو العلامة",
    destinations: "وجهات الشحن أو عدد الوجهات",
    message: "الرسالة / تفاصيل المشروع",
    consent: "أفهم أن هذا النموذج مخصص لاستفسار مشروع مخصص، وأن MorePower2You قد تتواصل معي بشأن الخطوات التالية.",
    submit: "إرسال الاستفسار",
    success: "تم استلام طلب مشروع الإهداء. سنراجع التفاصيل ونتابع مع الخطوة التالية.",
    error: "تعذر إرسال الطلب. يرجى مراجعة الحقول والمحاولة مرة أخرى.",
    required: "مطلوب",
    turnstileDev: "ستظهر حماية الرسائل غير المرغوب فيها هنا عند إعداد مفتاح Turnstile.",
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

const options: Partial<Record<Locale, { projectType: SelectOption[]; industry: SelectOption[]; occasion: SelectOption[] }>> & {
  en: { projectType: SelectOption[]; industry: SelectOption[]; occasion: SelectOption[] };
  he: { projectType: SelectOption[]; industry: SelectOption[]; occasion: SelectOption[] };
} = {
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
  const t = copy[locale] ?? copy.en;
  const selectOptions = options[locale] ?? options.en;
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
