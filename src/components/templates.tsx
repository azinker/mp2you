import Image from "next/image";
import {
  ArrowRight,
  Boxes,
  CheckCircle2,
  Gamepad2,
  Gem,
  Gift,
  Globe2,
  PackageCheck,
  Sparkles,
  Warehouse,
} from "lucide-react";
import type { BasicItem, BlogPost, CaseStudy, Locale, MarketingPage, Resource, Service, SiteContent } from "@/content/site";
import { HeroVisual } from "@/components/hero-visual";
import { ContactForm } from "@/components/contact-form";
import { VersionedLink as Link } from "@/components/versioned-link";
import { cn, formatDate } from "@/lib/utils";

const serviceIcons = [Gift, PackageCheck, Sparkles, Warehouse, Gamepad2, Globe2];

export function Breadcrumbs({ locale, items }: { locale: Locale; items: { label: string; href: string }[] }) {
  const home = locale === "he" ? "בית" : "Home";
  return (
    <nav className="container-shell pt-7 text-sm text-stone" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href={locale === "he" ? "/he" : "/"} className="hover:text-charcoal">
            {home}
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.href} className="flex items-center gap-2">
            <span aria-hidden="true">/</span>
            <Link href={item.href} className="hover:text-charcoal">
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  primaryCta,
  secondaryCta,
  compact = false,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  compact?: boolean;
}) {
  return (
    <section className={cn("page-hero", compact && "page-hero-compact")}>
      <div className="container-shell">
        <div className="max-w-4xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="hero-copy">{intro}</p>
          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {primaryCta ? (
                <Link href={primaryCta.href} className="button button-primary" data-track="page-primary-cta">
                  {primaryCta.label}
                </Link>
              ) : null}
              {secondaryCta ? (
                <Link href={secondaryCta.href} className="button button-secondary" data-track="page-secondary-cta">
                  {secondaryCta.label}
                </Link>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function HomePage({ site }: { site: SiteContent }) {
  return (
    <>
      <section className="home-hero">
        <div className="container-shell grid gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div>
            <p className="eyebrow">{site.home.hero.eyebrow}</p>
            <h1>{site.home.hero.title}</h1>
            <p className="hero-copy">{site.home.hero.text}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={site.home.hero.primaryCta.href} className="button button-primary" data-track="home-primary-cta">
                {site.home.hero.primaryCta.label}
              </Link>
              <Link href={site.home.hero.secondaryCta.href} className="button button-secondary" data-track="home-secondary-cta">
                {site.home.hero.secondaryCta.label}
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {site.home.hero.proof.map((item) => (
                <div className="proof-pill" key={item}>
                  <CheckCircle2 size={17} aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <HeroVisual />
        </div>
      </section>

      <section className="proof-band">
        <div className="container-shell grid gap-5 md:grid-cols-3">
          {site.home.proof.map((item) => (
            <article key={item.title} className="proof-card">
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <EditorialBlock block={site.home.whatWeDo} />
      <ProcessBand title={site.locale === "he" ? "תהליך עבודה מלא" : "Turnkey Process"} items={site.home.process} />
      <FeaturedBlocks blocks={site.home.featured} />
      <ServiceOverview locale={site.locale} services={site.services} />
      <OccasionBand title={site.locale === "he" ? "אירועים ועונות שמתאימים למתנות" : "Occasions and Seasonal Programs"} occasions={site.home.occasions} />
      <IndustryBand title={site.locale === "he" ? "למי זה מתאים" : "Who We Serve"} items={site.industries} />
      <TestimonialsPreview site={site} />
      <GalleryPreview site={site} />
      <ResourcesPreview site={site} />
      <FinalCta site={site} />
    </>
  );
}

export function StandardPage({ page }: { page: MarketingPage }) {
  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} intro={page.intro} primaryCta={page.primaryCta} secondaryCta={page.secondaryCta} />
      {page.blocks.map((block) => (
        <EditorialBlock block={block} key={block.title} />
      ))}
    </>
  );
}

export function ServicePage({ locale, service, related }: { locale: Locale; service: Service; related: Service[] }) {
  return (
    <>
      <PageHero
        eyebrow={service.eyebrow}
        title={service.title}
        intro={service.intro}
        primaryCta={service.primaryCta}
        secondaryCta={service.secondaryCta}
      />
      {service.blocks.map((block) => (
        <EditorialBlock block={block} key={block.title} />
      ))}
      <OccasionBand title={locale === "he" ? "רעיונות טובים להתחלה" : "Flexible Starting Points"} occasions={service.occasions} />
      <section className="section-band">
        <div className="container-shell">
          <SectionIntro
            eyebrow={locale === "he" ? "שירותים קשורים" : "Related services"}
            title={locale === "he" ? "אפשר לשלב שירותים לפי הצורך." : "Combine services around the shape of the project."}
            text={
              locale === "he"
                ? "כל פרויקט מתוכנן לפי קהל, היקף, מיתוג, יעדים ולוח זמנים."
                : "Every project can be scoped around audience, scale, branding, destinations, and timing."
            }
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {related.map((item) => (
              <CardLink key={item.slug} href={locale === "he" ? `/he/${item.slug}` : `/${item.slug}`} title={item.title} text={item.summary} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function ServicesIndex({ site }: { site: SiteContent }) {
  const page = site.pages.find((item) => item.slug === "services");
  return (
    <>
      {page ? <PageHero eyebrow={page.eyebrow} title={page.title} intro={page.intro} primaryCta={page.primaryCta} secondaryCta={page.secondaryCta} /> : null}
      <ServiceOverview locale={site.locale} services={site.services} expanded />
      <ProcessBand title={site.locale === "he" ? "תהליך העבודה" : "How the Work Comes Together"} items={site.home.process} />
      <FinalCta site={site} />
    </>
  );
}

export function WhoWeServePage({ site }: { site: SiteContent }) {
  const page = site.pages.find((item) => item.slug === "who-we-serve");
  return (
    <>
      {page ? <PageHero eyebrow={page.eyebrow} title={page.title} intro={page.intro} primaryCta={page.primaryCta} secondaryCta={page.secondaryCta} /> : null}
      <IndustryBand title={site.locale === "he" ? "צוותים ותחומים" : "Industries and Teams"} items={site.industries} />
      <section className="section-band section-band-warm">
        <div className="container-shell">
          <SectionIntro
            eyebrow={site.locale === "he" ? "תוכן עתידי" : "CMS ready"}
            title={site.locale === "he" ? "עמודי תחומים נוספים מוכנים להמשך." : "Future industry pages are ready in the content model."}
            text={
              site.locale === "he"
                ? "עמוד הגיימינג מפורסם עכשיו. שאר התחומים שמורים לכתיבה ממוקדת יותר לפני פרסום."
                : "The gaming page is published now. Additional industries are held for deeper content before publishing."
            }
          />
          <div className="mt-8 flex flex-wrap gap-3">
            {site.futureIndustries.map((item) => (
              <span className="tag" key={item}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function ProcessPage({ site }: { site: SiteContent }) {
  const page = site.pages.find((item) => item.slug === "process");
  return (
    <>
      {page ? <PageHero eyebrow={page.eyebrow} title={page.title} intro={page.intro} primaryCta={page.primaryCta} secondaryCta={page.secondaryCta} /> : null}
      <ProcessBand title={site.locale === "he" ? "מהרעיון ועד ההגעה ליעד" : "From Idea to Doorstep"} items={site.home.process} detailed />
      <FinalCta site={site} />
    </>
  );
}

export function GalleryPage({ site }: { site: SiteContent }) {
  const page = site.pages.find((item) => item.slug === "gallery");
  return (
    <>
      {page ? <PageHero eyebrow={page.eyebrow} title={page.title} intro={page.intro} compact /> : null}
      <section className="section-band">
        <div className="container-shell grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {site.gallery.map((item) => (
            <article className="image-card" key={item.title}>
              <Image src={item.image} alt={item.alt} width={680} height={520} className="aspect-[4/3] w-full object-cover" />
              <div className="p-5">
                <h2>{item.title}</h2>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export function TestimonialsPage({ site }: { site: SiteContent }) {
  const page = site.pages.find((item) => item.slug === "testimonials");
  return (
    <>
      {page ? <PageHero eyebrow={page.eyebrow} title={page.title} intro={page.intro} compact /> : null}
      <TestimonialsGrid testimonials={site.testimonials} />
    </>
  );
}

export function FaqPage({ site }: { site: SiteContent }) {
  const page = site.pages.find((item) => item.slug === "faqs");
  return (
    <>
      {page ? <PageHero eyebrow={page.eyebrow} title={page.title} intro={page.intro} compact /> : null}
      <FaqList faqs={site.faqs} />
    </>
  );
}

export function CaseStudiesIndex({ site }: { site: SiteContent }) {
  const page = site.pages.find((item) => item.slug === "case-studies");
  return (
    <>
      {page ? <PageHero eyebrow={page.eyebrow} title={page.title} intro={page.intro} compact /> : null}
      <section className="section-band">
        <div className="container-shell grid gap-5 md:grid-cols-2">
          {site.caseStudies.map((item) => (
            <CaseStudyCard key={item.slug} item={item} href={site.locale === "he" ? `/he/case-studies/${item.slug}` : `/case-studies/${item.slug}`} />
          ))}
        </div>
      </section>
    </>
  );
}

export function CaseStudyPage({ locale, item }: { locale: Locale; item: CaseStudy }) {
  return (
    <>
      <PageHero eyebrow={item.label} title={item.title} intro={item.summary} compact />
      <section className="section-band">
        <div className="container-narrow grid gap-5">
          <DetailPanel title={locale === "he" ? "האתגר" : "Challenge"} text={item.challenge} />
          <DetailPanel title={locale === "he" ? "הגישה" : "Possible Approach"} text={item.approach} />
          <DetailPanel title={locale === "he" ? "התוצאה" : "Intended Outcome"} text={item.outcome} />
        </div>
      </section>
    </>
  );
}

export function InsightsIndex({ site }: { site: SiteContent }) {
  const posts = site.posts.filter((post) => post.status === "published");
  return (
    <>
      <PageHero
        eyebrow={site.locale === "he" ? "מאמרים" : "Insights"}
        title={site.locale === "he" ? "תובנות שימושיות על מתנות ארגוניות." : "Useful thinking for better corporate gifting."}
        intro={
          site.locale === "he"
            ? "מאמרים קצרים על אסטרטגיה, VIP, חגים, קופסאות ממותגות ולוגיסטיקה."
            : "Starter SEO content covering gifting strategy, VIP appreciation, holiday planning, branded boxes, and fulfillment logistics."
        }
        compact
      />
      <section className="section-band">
        <div className="container-shell grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} locale={site.locale} />
          ))}
        </div>
      </section>
    </>
  );
}

export function InsightPostPage({ locale, post }: { locale: Locale; post: BlogPost }) {
  return (
    <>
      <PageHero eyebrow={formatDate(post.date, locale)} title={post.title} intro={post.excerpt} compact />
      <section className="section-band">
        <article className="container-narrow article-body">
          {post.sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.text}</p>
            </section>
          ))}
        </article>
      </section>
    </>
  );
}

export function ResourcePage({ locale, resource }: { locale: Locale; resource: Resource }) {
  return (
    <>
      <PageHero
        eyebrow={locale === "he" ? "מדריך פתוח" : "Open resource"}
        title={resource.title}
        intro={resource.summary}
        primaryCta={{ label: locale === "he" ? "התחילו פרויקט" : "Start a Project", href: locale === "he" ? "/he/contact" : "/contact" }}
        compact
      />
      <section className="section-band">
        <div className="container-narrow grid gap-5">
          {resource.sections.map((section) => (
            <DetailPanel key={section.title} title={section.title} text={section.text} />
          ))}
          <p className="text-sm leading-7 text-stone">
            {locale === "he"
              ? "המדריך פתוח כרגע ואינו דורש הרשמה לניוזלטר. בהמשך אפשר להפוך אותו להורדה עם הרשמה."
              : "This structure is ready for future gated download behavior. It is currently ungated and has no newsletter signup."}
          </p>
        </div>
      </section>
    </>
  );
}

export function ContactPage({ site }: { site: SiteContent }) {
  const page = site.pages.find((item) => item.slug === "contact");
  return (
    <>
      {page ? <PageHero eyebrow={page.eyebrow} title={page.title} intro={page.intro} compact /> : null}
      <section className="section-band">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            {page?.blocks.map((block) => (
              <div className="content-panel" key={block.title}>
                <h2>{block.title}</h2>
                <p>{block.text}</p>
                {block.items ? (
                  <ul className="mt-5 grid gap-3">
                    {block.items.map((item) => (
                      <li className="flex gap-3" key={item.title}>
                        <CheckCircle2 className="mt-1 shrink-0 text-gold" size={18} aria-hidden="true" />
                        <span>
                          <strong>{item.title}:</strong> {item.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
          <ContactForm locale={site.locale} />
        </div>
      </section>
    </>
  );
}

function EditorialBlock({ block }: { block: PageBlockLike }) {
  return (
    <section className="section-band">
      <div className="container-shell grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <SectionIntro eyebrow={block.eyebrow} title={block.title} text={block.text} />
        {block.items?.length ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {block.items.map((item) => (
              <article className="feature-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        ) : (
          <div className="accent-panel">
            <Gem aria-hidden="true" />
            <p>{block.text}</p>
          </div>
        )}
      </div>
    </section>
  );
}

type PageBlockLike = {
  eyebrow?: string;
  title: string;
  text: string;
  items?: BasicItem[];
};

function SectionIntro({ eyebrow, title, text }: { eyebrow?: string; title: string; text: string }) {
  return (
    <div className="section-intro">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

function ProcessBand({ title, items, detailed = false }: { title: string; items: BasicItem[]; detailed?: boolean }) {
  return (
    <section className="section-band section-band-warm">
      <div className="container-shell">
        <SectionIntro title={title} text=" " />
        <div className={cn("mt-10 grid gap-4", detailed ? "md:grid-cols-2 xl:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4")}>
          {items.map((item, index) => (
            <article className="process-card" key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedBlocks({ blocks }: { blocks: PageBlockLike[] }) {
  return (
    <section className="section-band">
      <div className="container-shell grid gap-5 lg:grid-cols-3">
        {blocks.map((block) => (
          <article className="feature-large" key={block.title}>
            {block.eyebrow ? <p className="eyebrow">{block.eyebrow}</p> : null}
            <h2>{block.title}</h2>
            <p>{block.text}</p>
            {block.items ? (
              <ul className="mt-6 grid gap-4">
                {block.items.map((item) => (
                  <li key={item.title}>
                    <strong>{item.title}</strong>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}

function ServiceOverview({ locale, services, expanded = false }: { locale: Locale; services: Service[]; expanded?: boolean }) {
  return (
    <section className="section-band">
      <div className="container-shell">
        <SectionIntro
          eyebrow={locale === "he" ? "שירותים" : "Services"}
          title={locale === "he" ? "שירותים שאפשר לשלב בפרויקט אחד." : "Services that can work together as one project."}
          text={
            locale === "he"
              ? "ההתמקדות היא מתנות ארגוניות, קופסאות ממותגות, קונסיירז' ולוגיסטיקה."
              : "The emphasis order is corporate gifting, custom branded gift boxes, concierge services, and fulfillment."
          }
        />
        <div className={cn("mt-10 grid gap-5", expanded ? "md:grid-cols-2" : "md:grid-cols-3")}>
          {services
            .sort((a, b) => a.order - b.order)
            .map((service, index) => {
              const Icon = serviceIcons[index % serviceIcons.length];
              return (
                <Link href={locale === "he" ? `/he/${service.slug}` : `/${service.slug}`} className="service-card" key={service.slug}>
                  <Icon size={24} aria-hidden="true" />
                  <h3>{service.title}</h3>
                  <p>{service.summary}</p>
                  <span>
                    {locale === "he" ? "למידע נוסף" : "Explore"} <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </Link>
              );
            })}
        </div>
      </div>
    </section>
  );
}

function OccasionBand({ title, occasions }: { title: string; occasions: string[] }) {
  return (
    <section className="occasion-band">
      <div className="container-shell">
        <h2>{title}</h2>
        <div className="mt-7 flex flex-wrap gap-3">
          {occasions.map((item) => (
            <span className="tag tag-light" key={item}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function IndustryBand({ title, items }: { title: string; items: BasicItem[] }) {
  return (
    <section className="section-band">
      <div className="container-shell">
        <SectionIntro title={title} text=" " />
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <article className="industry-card" key={item.title}>
              <Boxes size={22} aria-hidden="true" />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsPreview({ site }: { site: SiteContent }) {
  return (
    <section className="section-band section-band-warm">
      <div className="container-shell">
        <SectionIntro
          eyebrow={site.locale === "he" ? "המלצות" : "Testimonials"}
          title={site.locale === "he" ? "מה לקוחות מעריכים בעבודה איתנו." : "The meaning of current testimonials is preserved."}
          text={
            site.locale === "he"
              ? "תיאום מסודר, רעיונות טובים וביצוע שאפשר לסמוך עליו."
              : "The wording has been refreshed to feel clearer, more polished, and more enterprise-ready."
          }
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {site.testimonials.slice(0, 2).map((item) => (
            <TestimonialCard item={item} key={item.name} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsGrid({ testimonials }: { testimonials: { name: string; context: string; quote: string }[] }) {
  return (
    <section className="section-band">
      <div className="container-shell grid gap-5 md:grid-cols-2">
        {testimonials.map((item) => (
          <TestimonialCard item={item} key={item.name} />
        ))}
      </div>
    </section>
  );
}

function TestimonialCard({ item }: { item: { name: string; context: string; quote: string } }) {
  return (
    <figure className="testimonial-card">
      <blockquote>“{item.quote}”</blockquote>
      <figcaption>
        <strong>{item.name}</strong>
        <span>{item.context}</span>
      </figcaption>
    </figure>
  );
}

function GalleryPreview({ site }: { site: SiteContent }) {
  return (
    <section className="section-band">
      <div className="container-shell">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <SectionIntro
            eyebrow={site.locale === "he" ? "גלריה" : "Gallery"}
            title={site.locale === "he" ? "השראה חזותית למתנות, אריזות ושילוח." : "Visual context for gifting, packaging, and fulfillment."}
            text={site.locale === "he" ? "התמונות זמניות עד להחלפה בתמונות פרימיום חדשות." : "Legacy source images are used as placeholders until premium imagery is generated."}
          />
          <Link className="button button-secondary" href={site.locale === "he" ? "/he/gallery" : "/gallery"}>
            {site.locale === "he" ? "לגלריה" : "View Gallery"}
          </Link>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {site.gallery.slice(0, 3).map((item) => (
            <div className="preview-image" key={item.title}>
              <Image src={item.image} alt={item.alt} width={520} height={380} className="aspect-[4/3] w-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ResourcesPreview({ site }: { site: SiteContent }) {
  return (
    <section className="section-band section-band-warm">
      <div className="container-shell">
        <SectionIntro
          eyebrow={site.locale === "he" ? "משאבים" : "Resources"}
          title={site.locale === "he" ? "תכנון מתנות מתחיל בהחלטות טובות." : "Better gifting starts with better planning."}
          text={
            site.locale === "he"
              ? "שלושה מדריכים פתוחים מוכנים לשימוש, עם מבנה שמתאים להמרה ל-PDF בעתיד."
              : "Three ungated resources are ready now, with a structure that can be converted into PDFs later."
          }
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {site.resources.map((resource) => (
            <CardLink
              key={resource.slug}
              href={site.locale === "he" ? `/he/resources/${resource.slug}` : `/resources/${resource.slug}`}
              title={resource.title}
              text={resource.summary}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta({ site }: { site: SiteContent }) {
  return (
    <section className="final-cta">
      <div className="container-shell">
        <div className="final-cta-inner">
          <div>
            <p className="eyebrow">{site.locale === "he" ? "השלב הבא" : "Next step"}</p>
            <h2>{site.home.finalCta.title}</h2>
            <p>{site.home.finalCta.text}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link href={site.locale === "he" ? "/he/contact" : "/contact"} className="button button-primary" data-track="final-primary-cta">
              {site.home.hero.primaryCta.label}
            </Link>
            <Link href={site.locale === "he" ? "/he/services" : "/services"} className="button button-secondary" data-track="final-secondary-cta">
              {site.locale === "he" ? "לשירותים" : "Explore Services"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function CardLink({ href, title, text }: { href: string; title: string; text: string }) {
  return (
    <Link href={href} className="card-link">
      <h3>{title}</h3>
      <p>{text}</p>
      <span>
        <ArrowRight size={16} aria-hidden="true" />
      </span>
    </Link>
  );
}

function CaseStudyCard({ item, href }: { item: CaseStudy; href: string }) {
  return (
    <Link href={href} className="case-card">
      <span className="tag">{item.label}</span>
      <h2>{item.title}</h2>
      <p>{item.summary}</p>
    </Link>
  );
}

function PostCard({ post, locale }: { post: BlogPost; locale: Locale }) {
  return (
    <Link href={locale === "he" ? `/he/insights/${post.slug}` : `/insights/${post.slug}`} className="post-card">
      <span>{formatDate(post.date, locale)}</span>
      <h2>{post.title}</h2>
      <p>{post.excerpt}</p>
    </Link>
  );
}

function FaqList({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return (
    <section className="section-band">
      <div className="container-narrow divide-y divide-champagne/70">
        {faqs.map((faq) => (
          <details className="faq-item" key={faq.question}>
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function DetailPanel({ title, text }: { title: string; text: string }) {
  return (
    <section className="content-panel">
      <h2>{title}</h2>
      <p>{text}</p>
    </section>
  );
}
