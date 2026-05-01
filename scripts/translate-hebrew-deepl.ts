import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { content, type SiteContent } from "../src/content/site";

type TranslationEntry = {
  path: string[];
  source: string;
};

type DeepLTranslation = {
  text: string;
};

type DeepLResponse = {
  translations: DeepLTranslation[];
};

const envPath = resolve(".env.local");
const contentPath = resolve("src/content/site.ts");
const apply = process.argv.includes("--apply");
const skipKeys = new Set(["slug", "href", "image", "status", "date", "locale", "direction", "siteName", "name"]);
const generalContext =
  "Website marketing copy for MorePower2You, a premium corporate gifting, concierge, warehousing, fulfillment, and distribution partner. Translate into polished, professional Modern Hebrew for Israeli business readers. Keep the brand name MorePower2You, English acronyms such as VIP, HR, RPG, PDF, and technology names unchanged.";

const manualTranslations: Record<string, string> = {
  "settings.tagline": "הכוח של מתנה מדויקת, מותאם לתוכניות ארגוניות מודרניות.",
  "settings.contactNote": "פניות לפרויקטים מתקבלות דרך הטופס המאובטח.",
  "settings.serviceArea": "תמיכה בפרויקטי מתנות, קונסיירז', פולפילמנט, אחסון ושילוח בארץ ובעולם.",
  "settings.legacyPrivateAddressNote":
    "עמוד הקשר הישן בוורדפרס הציג כתובת בפיניקס. אין לפרסם כתובת פיזית ללא אישור.",
  "nav[0].label": "שירותים",
  "nav[1].label": "גיימינג ו-VIP",
  "nav[2].label": "תהליך",
  "nav[3].label": "גלריה",
  "nav[4].label": "תובנות",
  "nav[5].label": "צור קשר",
  "footer.columns[0].title": "חברה",
  "footer.columns[1].title": "שירותים",
  "footer.columns[2].title": "תכנון",
  "footer.columns[0].links[1].label": "למי אנחנו מתאימים",
  "footer.columns[1].links[3].label": "פולפילמנט",
  "home.hero.eyebrow": "מתנות, קונסיירז' ופולפילמנט מקצה לקצה",
  "home.hero.title": "מתנות ארגוניות בהתאמה אישית, מהרעיון ועד פתח הדלת.",
  "home.hero.text":
    "MorePower2You יוצרת תוכניות מתנות יוקרתיות, קופסאות מתנה ממותגות, משלוחי VIP, קמפיינים עונתיים ופרויקטי קונסיירז' מורכבים הכוללים רכש, אריזה, אחסון, פולפילמנט, שילוח ותמיכה תחת קורת גג אחת.",
  "home.hero.primaryCta.label": "התחילו פרויקט מתנות מותאם",
  "home.hero.secondaryCta.label": "ראו איך זה עובד",
  "home.hero.proof[0]": "פרויקטים נבחרים של יותר מ-5,000 מתנות",
  "home.hero.proof[1]": "פריסה ארצית ובינלאומית",
  "home.hero.proof[2]": "ממזון ועד אלקטרוניקה, וכל מה שביניהם",
  "home.proof[0].text": "קונספט, רכש, התאמה אישית, אריזה, אחסון, פולפילמנט, שילוח ותמיכה בפרויקט.",
  "home.proof[2].title": "התאמה יוקרתית",
  "home.whatWeDo.items[3].title": "פולפילמנט ודיוור המוני",
  "home.featured[0].eyebrow": "גיימינג ומתנות לשחקני VIP",
  "home.featured[2].eyebrow": "פולפילמנט, אחסון והפצה",
  "home.occasions[4]": "הוקרת לקוחות",
  "home.occasions[5]": "הוקרת שחקנים ולקוחות VIP",
  "home.finalCta.items[1].text": "גלו את השירותים",
  "pages[0].secondaryCta.label": "גלו את השירותים",
  "pages[0].blocks[0].text":
    "המסר המקורי של MorePower2You היה פשוט: לשלב מתנות מיוחדות ושירותי קונסיירז' כדי להפוך רעיון לפתרון מקצה לקצה. האתר החדש ממשיך את הרעיון הזה עם דגש מעודן יותר על מתנות ארגוניות, קופסאות מתנה ממותגות, תוכניות ללקוחות VIP, אחסון, פולפילמנט ותמיכה בדיוור המוני.",
  "pages[2].title": "למי אנחנו מתאימים",
  "pages[2].eyebrow": "לצוותים שרוצים שמתנות ירגישו מחושבות ומדויקות",
  "pages[2].secondaryCta.label": "גיימינג ומתנות לשחקני VIP",
  "pages[3].intro": "פרויקט מתנות מתחשב דורש גם טעם טוב וגם ביצוע מדויק. MorePower2You מלווה אתכם לאורך כל הדרך, מהאפיון ועד המסירה.",
  "pages[3].secondaryCta.label": "גלו את השירותים",
  "services[1].secondaryCta.label": "צפו בגלריה",
  "services[1].occasions[0]": "הוקרת VIP",
  "services[2].summary": "תמיכת קונסיירז' ברמה גבוהה למתנות מיוחדות ולפרויקטים מותאמים שאינם מתאימים לקטלוג סטנדרטי.",
  "services[2].seo.description":
    "שירותי קונסיירז' ברמה גבוהה למתנות מיוחדות, איתור ספקים מותאם, פרויקטי VIP, אריזות ממותגות, תיאום לוגיסטי ותוכניות מקצה לקצה.",
  "services[3].title": "פולפילמנט, אחסון והפצה",
  "services[3].summary": "שירותי פולפילמנט, אחסון, הרכבת מתנות, דיוור המוני ותמיכה בהפצה לפרויקטים בארץ ובעולם.",
  "services[3].intro":
    "תוכניות מתנות מצליחות כאשר הלוגיסטיקה מקבלת אותה רמת תשומת לב כמו המתנה עצמה. MorePower2You יכולה לתמוך באחסון, ניהול מלאי מדורג, פולפילמנט ודיוור המוני.",
  "services[3].primaryCta.label": "קבלו תמיכה בפולפילמנט",
  "services[3].secondaryCta.label": "צפו במקרי בוחן",
  "services[3].seo.description": "פולפילמנט, אחסון, הרכבת מתנות, דיוור המוני, הפצה ותמיכה לוגיסטית בארץ ובעולם לפרויקטים של מתנות ארגוניות.",
  "services[4].title": "גיימינג ומתנות לשחקני VIP",
  "services[4].secondaryCta.label": "גלו מתנות ארגוניות",
  "services[4].seo.title": "גיימינג ומתנות לשחקני VIP | MorePower2You",
  "testimonials[1].quote":
    "MorePower2You ניהלה פרויקט הטמעת תוכנה מפורט, משלב התזמון ועד אישור ההשלמה. הסבלנות, הדיוק וההבנה של הצוות לצרכים שלנו אפשרו לפרויקט להתנהל בצורה חלקה, ואנחנו ממשיכים לעבוד איתם על פרויקטים נוספים.",
  "faqs[6].answer": "כן. שירותי אחסון ותמיכה במלאי יכולים להיכלל בהיקף הפרויקט, כולל פולפילמנט חוזר או מדורג לפי הצורך.",
  "gallery[5].title": "אצירת מתנות בקונסיירז'",
  "caseStudies[0].title": "מתנת אבן דרך לשחקני VIP",
  "caseStudies[0].summary": "מותג גיימינג רוצה מתנה פיזית יוקרתית לשחקנים מובילים שהגיעו לאבן דרך בתוכנית הנאמנות.",
  "caseStudies[0].approach": "MorePower2You יכולה לאצור מוצרי לייף סטייל יוקרתיים, לעצב אריזה נקייה שמותאמת למותג, להוסיף כרטיס לציון אבן הדרך, לארגן מלאי ולתאם משלוח ליעדים מאושרים.",
  "caseStudies[1].approach": "MorePower2You יכולה ליצור רמות נמענים, לאתר אפשרויות מתנה גמישות, לתאם אריזה ממותגת, להכין פולפילמנט ולתמוך בצרכי דיוור בארץ ובעולם.",
  "caseStudies[2].approach": "MorePower2You יכולה לתמוך בתכנון אחסון, הכנת מלאי, פולפילמנט חוזר ותיאום דיוור לפי לוח הזמנים המאושר.",
  "caseStudies[2].seo.keywords[1]": "פולפילמנט חוזר",
  "caseStudies[3].approach": "MorePower2You יכולה לאצור פריטים, לתאם תוספות מודפסות ואריזות, להרכיב ערכות ולתמוך בטיפול ברשימת היעדים.",
  "posts[0].seo.description": "תכנון קמפיינים למתנות ארגוניות הכוללים פילוח קהלים, אסטרטגיית מוצרים, אריזה, פולפילמנט ולוחות זמנים.",
  "posts[2].sections[2].title": "השאירו מקום לפולפילמנט",
  "posts[6].excerpt": "נושא טיוטה לתכנון היקף הנמענים, פולפילמנט ותזמון.",
  "resources[1].sections[2].title": "פולפילמנט סופי",
  "resources[2].sections[2].text": "יש להשתמש בניסוח מעודן, בנתונים מדויקים ובתכנון פולפילמנט ברור כדי לשמר את התחושה היוקרתית.",
  "legal[1].blocks[0].text":
    "כל הפרויקטים בתחום המתנות והקונסיירז' מותאמים אישית. כל הצעה, לוח זמנים, זמינות מוצרים, תוכנית פולפילמנט או הצעת מחיר יש לאשר בכתב.",
};

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});

async function main() {
  const env = readEnvFile(envPath);
  const apiKey = env.DEEPL_API_KEY;

  if (!apiKey) {
    throw new Error("DEEPL_API_KEY is missing from .env.local.");
  }

  const endpoint = env.DEEPL_API_PLAN === "pro" || !apiKey.endsWith(":fx") ? "https://api.deepl.com" : "https://api-free.deepl.com";
  const entries = collectTranslationEntries(content.en);
  const translations = await translateEntries(entries, apiKey, endpoint);
  const he = buildHebrewContent(content.en, translations);
  validateHebrewContent(he);

  if (!apply) {
    const usage = await getUsage(apiKey, endpoint);
    console.log(
      JSON.stringify(
        {
          mode: "dry-run",
          translatedStrings: entries.length,
          sourceCharacters: entries.reduce((sum, item) => sum + item.source.length, 0),
          endpoint,
          usage,
          nextStep: "Run with --apply to update src/content/site.ts.",
        },
        null,
        2,
      ),
    );
    return;
  }

  replaceHebrewContent(he);
  const usage = await getUsage(apiKey, endpoint);
  console.log(
    JSON.stringify(
      {
        mode: "applied",
        translatedStrings: entries.length,
        endpoint,
        usage,
        updated: contentPath,
      },
      null,
      2,
    ),
  );
}

function readEnvFile(path: string) {
  const env: Record<string, string> = {};

  for (const rawLine of readFileSync(path, "utf8").split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#") || !line.includes("=")) continue;
    const [key, ...rest] = line.split("=");
    const value = rest.join("=").trim();
    env[key.trim()] = stripQuotes(value);
  }

  return env;
}

function stripQuotes(value: string) {
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1);
  }

  return value;
}

function collectTranslationEntries(value: unknown, path: string[] = []): TranslationEntry[] {
  if (typeof value === "string") {
    return shouldTranslate(path, value) ? [{ path, source: value }] : [];
  }

  if (Array.isArray(value)) {
    return value.flatMap((item, index) => collectTranslationEntries(item, [...path, String(index)]));
  }

  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, item]) => collectTranslationEntries(item, [...path, key]));
  }

  return [];
}

function shouldTranslate(path: string[], value: string) {
  if (!value.trim()) return false;
  const key = path.at(-1) || "";
  return !skipKeys.has(key);
}

async function translateEntries(entries: TranslationEntry[], apiKey: string, endpoint: string) {
  const translations = new Map<string, string>();

  for (let index = 0; index < entries.length; index += 50) {
    const batch = entries.slice(index, index + 50);
    const response = await fetch(`${endpoint}/v2/translate`, {
      method: "POST",
      headers: {
        Authorization: `DeepL-Auth-Key ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: batch.map((item) => item.source),
        source_lang: "EN",
        target_lang: "HE",
        context: generalContext,
        preserve_formatting: true,
        show_billed_characters: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`DeepL request failed with HTTP ${response.status}: ${await response.text()}`);
    }

    const payload = (await response.json()) as DeepLResponse;
    if (payload.translations.length !== batch.length) {
      throw new Error(`DeepL returned ${payload.translations.length} translations for a ${batch.length}-item batch.`);
    }

    payload.translations.forEach((translation, offset) => {
      const entry = batch[offset];
      const path = pathToString(entry.path);
      translations.set(path, editorialPolish(path, translation.text));
    });
  }

  for (const [path, text] of Object.entries(manualTranslations)) {
    translations.set(path, text);
  }

  return translations;
}

function buildHebrewContent(source: SiteContent, translations: Map<string, string>) {
  return localizeValue(source, [], translations) as SiteContent;
}

function localizeValue(value: unknown, path: string[], translations: Map<string, string>): unknown {
  if (typeof value === "string") {
    const key = path.at(-1) || "";
    const pathKey = pathToString(path);

    if (pathKey === "locale") return "he";
    if (pathKey === "direction") return "rtl";
    if (key === "href") return localizeHref(value);
    if (!shouldTranslate(path, value)) return value;

    return translations.get(pathKey) || value;
  }

  if (Array.isArray(value)) {
    return value.map((item, index) => localizeValue(item, [...path, String(index)], translations));
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, localizeValue(item, [...path, key], translations)]));
  }

  return value;
}

function localizeHref(href: string) {
  if (!href.startsWith("/") || href.startsWith("/he")) return href;
  return href === "/" ? "/he" : `/he${href}`;
}

function editorialPolish(path: string, text: string) {
  let polished = text
    .replace(/מורפאוור2יו/g, "MorePower2You")
    .replace(/More Power 2 You/g, "MorePower2You")
    .replace(/מתנות עסקיות/g, "מתנות ארגוניות")
    .replace(/מתנות העסקיות/g, "המתנות הארגוניות")
    .replace(/מתנות תאגידיות/g, "מתנות ארגוניות")
    .replace(/קופסאות שי/g, "קופסאות מתנה")
    .replace(/ביצוע הזמנות/g, "פולפילמנט")
    .replace(/הגשמה/g, "פולפילמנט")
    .replace(/הגשמת הזמנות/g, "פולפילמנט")
    .replace(/שירותי אחסון, אחסון/g, "שירותי פולפילמנט, אחסון")
    .replace(/אחסון, אחסון/g, "אחסון")
    .replace(/אחסנה/g, "אחסון")
    .replace(/מחסן/g, "אחסון")
    .replace(/סוהר מפתח/g, "מקצה לקצה")
    .replace(/הערכת הלקוח/g, "הוקרת לקוחות")
    .replace(/הערכת לקוחות/g, "הוקרת לקוחות")
    .replace(/הערכת עובדים/g, "הוקרת עובדים")
    .replace(/פולפילמנט חוזרות/g, "פולפילמנט חוזר")
    .replace(/תוכנית ביצוע/g, "תוכנית פולפילמנט")
    .replace(/ביצוע ההזמנות/g, "פולפילמנט")
    .replace(/ביצוע והזמנים/g, "פולפילמנט ולוחות זמנים")
    .replace(/תחום המשחקים/g, "תחום הגיימינג")
    .replace(/חברות משחקים/g, "חברות גיימינג")
    .replace(/מותג משחקים/g, "מותג גיימינג")
    .replace(/מתנות בתחום המשחקים/g, "מתנות בתחום הגיימינג")
    .replace(/לגילוי, אוצרות/g, "לאפיון, אצירת מוצרים")
    .replace(/משחקים ומתנות/g, "גיימינג ומתנות")
    .replace(/משחקים ו-VIP/g, "גיימינג ו-VIP")
    .replace(/תיבת מתנה/g, "קופסת מתנה")
    .replace(/תיבות מתנה/g, "קופסאות מתנה")
    .replace(/התחל פרויקט/g, "התחילו פרויקט")
    .replace(/צרו פרויקט/g, "התחילו פרויקט")
    .replace(/גלה את השירותים/g, "גלו את השירותים")
    .replace(/צפה בגלריה/g, "צפו בגלריה")
    .replace(/למי אנו פונים/g, "למי אנחנו מתאימים")
    .replace(/מוכן לשימוש מיידי/g, "מקצה לקצה")
    .replace(/פתח הבית/g, "פתח הדלת")
    .replace(/גיימינג ו-VIP Player/g, "גיימינג ושחקני VIP")
    .replace(/VIP Player/g, "שחקני VIP")
    .replace(/שחקן VIP/g, "שחקני VIP");

  if (path.endsWith(".primaryCta.label") && polished.includes("התחל")) {
    polished = polished.replace("התחל", "התחילו");
  }

  return polished;
}

function validateHebrewContent(site: SiteContent) {
  const serialized = JSON.stringify(site);

  if (site.locale !== "he") throw new Error("Generated content locale is not he.");
  if (site.direction !== "rtl") throw new Error("Generated content direction is not rtl.");
  if (serialized.includes("×") || serialized.includes("â")) throw new Error("Generated Hebrew content contains mojibake markers.");

  const hrefs = collectHrefs(site);
  const badHrefs = hrefs.filter((href) => href.startsWith("/") && !href.startsWith("/he"));
  if (badHrefs.length) {
    throw new Error(`Generated Hebrew content has non-localized hrefs: ${badHrefs.slice(0, 5).join(", ")}`);
  }

  const morePowerCount = (serialized.match(/MorePower2You/g) || []).length;
  if (morePowerCount < 5) throw new Error("Generated content unexpectedly lost MorePower2You brand references.");
}

function collectHrefs(value: unknown, path: string[] = []): string[] {
  if (typeof value === "string") {
    return path.at(-1) === "href" ? [value] : [];
  }

  if (Array.isArray(value)) {
    return value.flatMap((item, index) => collectHrefs(item, [...path, String(index)]));
  }

  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, item]) => collectHrefs(item, [...path, key]));
  }

  return [];
}

function replaceHebrewContent(site: SiteContent) {
  const source = readFileSync(contentPath, "utf8");
  const start = source.indexOf("const he: SiteContent = ");
  const end = source.indexOf("\n\nexport const content", start);

  if (start === -1 || end === -1) {
    throw new Error("Could not find the Hebrew content block in src/content/site.ts.");
  }

  const replacement = `const he: SiteContent = ${JSON.stringify(site, null, 2)};`;
  writeFileSync(contentPath, `${source.slice(0, start)}${replacement}${source.slice(end)}`);
}

async function getUsage(apiKey: string, endpoint: string) {
  const response = await fetch(`${endpoint}/v2/usage`, {
    headers: {
      Authorization: `DeepL-Auth-Key ${apiKey}`,
    },
  });

  if (!response.ok) return null;
  return response.json();
}

function pathToString(path: string[]) {
  return path.reduce((memo, part) => {
    if (/^\d+$/.test(part)) return `${memo}[${part}]`;
    return memo ? `${memo}.${part}` : part;
  }, "");
}
