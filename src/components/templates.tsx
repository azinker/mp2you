import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Building2,
  CheckCircle2,
  ChevronRight,
  Cpu,
  Gamepad2,
  Gem,
  Gift,
  Globe2,
  HeartPulse,
  Hotel,
  Landmark,
  PackageCheck,
  Sparkles,
  Star,
  Ticket,
  Users,
  Warehouse,
  type LucideIcon,
} from "lucide-react";
import type { BasicItem, BlogPost, CaseStudy, Locale, MarketingPage, Resource, Service, SiteContent } from "@/content/site";
import { ui } from "@/content/ui";
import { featuredGalleryProjects } from "@/content/gallery-projects";
import { HeroVisual } from "@/components/hero-visual";
import { ContactForm } from "@/components/contact-form";
import { ProjectGallery } from "@/components/project-gallery";
import { BowArt, DrawLine, Enter, Marquee, Petals, Reveal, SplitWords, Stagger, StaggerItem, Tilt } from "@/components/motion";
import { VersionedLink as Link } from "@/components/versioned-link";
import { withLocale } from "@/lib/content";
import { cn, formatDate } from "@/lib/utils";

const serviceIcons: LucideIcon[] = [Gift, PackageCheck, Sparkles, Warehouse, Gamepad2, Globe2];
const industryIcons: LucideIcon[] = [Gamepad2, Cpu, Building2, Landmark, Hotel, HeartPulse, Ticket, Users];
const tones = ["tone-blue", "tone-teal", "tone-coral", "tone-lavender", "tone-gold"] as const;
const featuredPhotos = [
  { src: "/photos/vip-gaming-kit.jpg", alt: "Dark VIP gaming gift kit with headphones and premium accessories on a desk" },
  { src: "/photos/navy-gift-box.jpg", alt: "Premium navy corporate gift box with tumbler, candle, and notebook" },
  { src: "/photos/fulfillment-studio.jpg", alt: "Organized fulfillment studio with staged gift boxes and packing stations" },
];

function tone(index: number) {
  return tones[index % tones.length];
}

/* ------------------------------------------------------------------ */
/* Shared building blocks                                              */
/* ------------------------------------------------------------------ */

export function Breadcrumbs({ locale, items }: { locale: Locale; items: { label: string; href: string }[] }) {
  const t = ui[locale];
  return (
    <nav className="container-shell breadcrumbs" aria-label="Breadcrumb">
      <ol>
        <li>
          <Link href={withLocale(locale, "/")}>{t.home}</Link>
        </li>
        {items.map((item) => (
          <li key={item.href}>
            <ChevronRight size={14} aria-hidden="true" />
            <Link href={item.href}>{item.label}</Link>
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
      <div className="bg-dots" aria-hidden="true" />
      <BowArt className="page-hero-art" />
      <div className="container-shell">
        <div className="max-w-4xl">
          <Enter>
            <p className="eyebrow">{eyebrow}</p>
          </Enter>
          <SplitWords as="h1" text={title} />
          <Enter delay={0.2}>
            <p className="hero-copy">{intro}</p>
          </Enter>
          {primaryCta || secondaryCta ? (
            <Enter delay={0.3}>
              <div className="hero-ctas">
                {primaryCta ? (
                  <Link href={primaryCta.href} className="button button-primary" data-track="page-primary-cta">
                    {primaryCta.label}
                    <ArrowRight size={17} aria-hidden="true" />
                  </Link>
                ) : null}
                {secondaryCta ? (
                  <Link href={secondaryCta.href} className="button button-secondary" data-track="page-secondary-cta">
                    {secondaryCta.label}
                  </Link>
                ) : null}
              </div>
            </Enter>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function SectionIntro({ eyebrow, title, text, light = false }: { eyebrow?: string; title: string; text?: string; light?: boolean }) {
  return (
    <Reveal className="section-intro">
      {eyebrow ? <p className={cn("eyebrow", light && "eyebrow-light")}>{eyebrow}</p> : null}
      <h2>{title}</h2>
      {text && text.trim() ? <p>{text}</p> : null}
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* Home                                                                */
/* ------------------------------------------------------------------ */

export function HomePage({ site }: { site: SiteContent }) {
  const t = ui[site.locale];
  return (
    <>
      <section className="home-hero">
        <div className="bg-dots" aria-hidden="true" />
        <Petals opacity={0.7} />
        <div className="container-shell hero-grid">
          <div>
            <Enter>
              <p className="eyebrow">{site.home.hero.eyebrow}</p>
            </Enter>
            <SplitWords as="h1" text={site.home.hero.title} accentLast={2} />
            <Enter delay={0.25}>
              <p className="hero-copy">{site.home.hero.text}</p>
            </Enter>
            <Enter delay={0.35}>
              <div className="hero-ctas">
                <Link href={site.home.hero.primaryCta.href} className="button button-primary" data-track="home-primary-cta">
                  {site.home.hero.primaryCta.label}
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
                <Link href={site.home.hero.secondaryCta.href} className="button button-secondary" data-track="home-secondary-cta">
                  {site.home.hero.secondaryCta.label}
                </Link>
              </div>
            </Enter>
            <Enter delay={0.45}>
              <div className="proof-row">
                {site.home.hero.proof.map((item) => (
                  <div className="proof-pill" key={item}>
                    <CheckCircle2 size={18} aria-hidden="true" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </Enter>
          </div>
          <HeroVisual labels={{ boxes: t.heroNoteBoxes, fulfillment: t.heroNoteFulfillment }} />
        </div>
      </section>

      <Marquee>
        <span className="marquee-item marquee-lead">{t.marqueeLead}</span>
        {site.industries.map((item) => (
          <span className="marquee-item" key={item.title}>
            <Sparkles size={14} aria-hidden="true" />
            {item.title}
          </span>
        ))}
      </Marquee>

      <section className="section-band">
        <Stagger className="container-shell proof-grid">
          {site.home.proof.map((item, index) => {
            const Icon = [Gem, Boxes, Sparkles][index % 3];
            return (
              <StaggerItem key={item.title}>
                <Tilt className={cn("card card-hover proof-card", tone(index))}>
                  <span className="icon-badge">
                    <Icon size={24} aria-hidden="true" />
                  </span>
                  <h2>{item.title}</h2>
                  <p>{item.text}</p>
                </Tilt>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      <EditorialBlock block={site.home.whatWeDo} cloud />
      <ProcessBand title={t.turnkeyProcess} intro={t.processIntro} items={site.home.process} />
      <FeaturedBlocks blocks={site.home.featured} />
      <ServiceOverview locale={site.locale} services={site.services} />
      <OccasionBand title={t.occasions} occasions={site.home.occasions} />
      <IndustryBand title={t.whoWeServe} items={site.industries} />
      <TestimonialsPreview site={site} />
      <GalleryPreview site={site} />
      <ResourcesPreview site={site} />
      <FinalCta site={site} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Page templates                                                      */
/* ------------------------------------------------------------------ */

export function StandardPage({ page }: { page: MarketingPage }) {
  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} intro={page.intro} primaryCta={page.primaryCta} secondaryCta={page.secondaryCta} />
      {page.blocks.map((block, index) => (
        <EditorialBlock block={block} key={block.title} cloud={index % 2 === 1} />
      ))}
    </>
  );
}

export function ServicePage({ locale, service, related }: { locale: Locale; service: Service; related: Service[] }) {
  const t = ui[locale];
  return (
    <>
      <PageHero eyebrow={service.eyebrow} title={service.title} intro={service.intro} primaryCta={service.primaryCta} secondaryCta={service.secondaryCta} />
      {service.blocks.map((block, index) => (
        <EditorialBlock block={block} key={block.title} cloud={index % 2 === 1} />
      ))}
      <OccasionBand title={t.startingPoints} occasions={service.occasions} />
      <section className="section-band">
        <div className="container-shell">
          <SectionIntro eyebrow={t.relatedServices} title={t.relatedTitle} text={t.relatedText} />
          <Stagger className="mt-10 grid gap-5 md:grid-cols-3">
            {related.map((item, index) => (
              <StaggerItem key={item.slug}>
                <CardLink href={withLocale(locale, `/${item.slug}`)} title={item.title} text={item.summary} cta={t.explore} toneClass={tone(index)} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}

export function ServicesIndex({ site }: { site: SiteContent }) {
  const page = site.pages.find((item) => item.slug === "services");
  const t = ui[site.locale];
  return (
    <>
      {page ? <PageHero eyebrow={page.eyebrow} title={page.title} intro={page.intro} primaryCta={page.primaryCta} secondaryCta={page.secondaryCta} /> : null}
      <ServiceOverview locale={site.locale} services={site.services} expanded />
      <ProcessBand title={t.howWorkComes} intro={t.processIntro} items={site.home.process} />
      <FinalCta site={site} />
    </>
  );
}

export function WhoWeServePage({ site }: { site: SiteContent }) {
  const page = site.pages.find((item) => item.slug === "who-we-serve");
  const t = ui[site.locale];
  return (
    <>
      {page ? <PageHero eyebrow={page.eyebrow} title={page.title} intro={page.intro} primaryCta={page.primaryCta} secondaryCta={page.secondaryCta} /> : null}
      <IndustryBand title={t.industriesTeams} items={site.industries} />
      <section className="section-band section-band-cloud">
        <div className="container-shell">
          <SectionIntro eyebrow={t.cmsReady} title={t.cmsTitle} text={t.cmsText} />
          <Stagger className="tag-cloud" stagger={0.05}>
            {site.futureIndustries.map((item) => (
              <StaggerItem key={item}>
                <span className="tag">{item}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
      <FinalCta site={site} />
    </>
  );
}

export function ProcessPage({ site }: { site: SiteContent }) {
  const page = site.pages.find((item) => item.slug === "process");
  const t = ui[site.locale];
  return (
    <>
      {page ? <PageHero eyebrow={page.eyebrow} title={page.title} intro={page.intro} primaryCta={page.primaryCta} secondaryCta={page.secondaryCta} /> : null}
      <ProcessBand title={t.fromIdea} intro={t.processIntro} items={site.home.process} detailed />
      <FinalCta site={site} />
    </>
  );
}

export function GalleryPage({ site }: { site: SiteContent }) {
  const page = site.pages.find((item) => item.slug === "gallery");
  return (
    <>
      {page ? <PageHero eyebrow={page.eyebrow} title={page.title} intro={page.intro} compact /> : null}
      <ProjectGallery />
      <FinalCta site={site} />
    </>
  );
}

export function TestimonialsPage({ site }: { site: SiteContent }) {
  const page = site.pages.find((item) => item.slug === "testimonials");
  return (
    <>
      {page ? <PageHero eyebrow={page.eyebrow} title={page.title} intro={page.intro} compact /> : null}
      <section className="section-band">
        <Stagger className="container-shell testimonial-grid">
          {site.testimonials.map((item, index) => (
            <StaggerItem key={item.name}>
              <TestimonialCard item={item} toneClass={tone(index)} />
            </StaggerItem>
          ))}
        </Stagger>
      </section>
      <FinalCta site={site} />
    </>
  );
}

export function FaqPage({ site }: { site: SiteContent }) {
  const page = site.pages.find((item) => item.slug === "faqs");
  return (
    <>
      {page ? <PageHero eyebrow={page.eyebrow} title={page.title} intro={page.intro} compact /> : null}
      <section className="section-band">
        <Stagger className="container-narrow faq-list" stagger={0.05}>
          {site.faqs.map((faq) => (
            <StaggerItem key={faq.question}>
              <details className="faq-item">
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
      <FinalCta site={site} />
    </>
  );
}

export function CaseStudiesIndex({ site }: { site: SiteContent }) {
  const page = site.pages.find((item) => item.slug === "case-studies");
  const t = ui[site.locale];
  return (
    <>
      {page ? <PageHero eyebrow={page.eyebrow} title={page.title} intro={page.intro} compact /> : null}
      <section className="section-band">
        <Stagger className="container-shell grid gap-5 md:grid-cols-2">
          {site.caseStudies.map((item, index) => (
            <StaggerItem key={item.slug}>
              <Link href={withLocale(site.locale, `/case-studies/${item.slug}`)} className={cn("card card-hover case-card", tone(index))}>
                <span className="tag" style={{ justifySelf: "start" }}>
                  {item.label}
                </span>
                <h2>{item.title}</h2>
                <p>{item.summary}</p>
                <span className="text-link">
                  {t.explore}
                  <ArrowRight size={16} aria-hidden="true" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
      <FinalCta site={site} />
    </>
  );
}

export function CaseStudyPage({ locale, item }: { locale: Locale; item: CaseStudy }) {
  const t = ui[locale];
  return (
    <>
      <PageHero eyebrow={item.label} title={item.title} intro={item.summary} compact />
      <section className="section-band">
        <Stagger className="container-narrow grid gap-5">
          <StaggerItem>
            <DetailPanel title={t.challenge} text={item.challenge} toneClass="tone-coral" index={1} />
          </StaggerItem>
          <StaggerItem>
            <DetailPanel title={t.approach} text={item.approach} toneClass="tone-blue" index={2} />
          </StaggerItem>
          <StaggerItem>
            <DetailPanel title={t.outcome} text={item.outcome} toneClass="tone-teal" index={3} />
          </StaggerItem>
        </Stagger>
      </section>
    </>
  );
}

export function InsightsIndex({ site }: { site: SiteContent }) {
  const posts = site.posts.filter((post) => post.status === "published");
  const t = ui[site.locale];
  return (
    <>
      <PageHero eyebrow={t.insights} title={t.insightsTitle} intro={t.insightsText} compact />
      <section className="section-band">
        <Stagger className="container-shell grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <StaggerItem key={post.slug}>
              <PostCard post={post} locale={site.locale} toneClass={tone(index)} />
            </StaggerItem>
          ))}
        </Stagger>
      </section>
      <FinalCta site={site} />
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
            <Reveal as="section" key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.text}</p>
            </Reveal>
          ))}
        </article>
      </section>
    </>
  );
}

export function ResourcePage({ locale, resource }: { locale: Locale; resource: Resource }) {
  const t = ui[locale];
  return (
    <>
      <PageHero
        eyebrow={t.openResource}
        title={resource.title}
        intro={resource.summary}
        primaryCta={{ label: t.startProject, href: withLocale(locale, "/contact") }}
        compact
      />
      <section className="section-band">
        <Stagger className="container-narrow grid gap-5">
          {resource.sections.map((section, index) => (
            <StaggerItem key={section.title}>
              <DetailPanel title={section.title} text={section.text} toneClass={tone(index)} index={index + 1} />
            </StaggerItem>
          ))}
          <p className="text-sm leading-7 text-muted">{t.resourceNote}</p>
        </Stagger>
      </section>
    </>
  );
}

export function ContactPage({ site }: { site: SiteContent }) {
  const page = site.pages.find((item) => item.slug === "contact");
  const t = ui[site.locale];
  const sameTitle = (a: string, b: string) => a.trim().toLocaleLowerCase() === b.trim().toLocaleLowerCase();
  // If the CMS/static content already has a "What happens next" block, fold it
  // into the steps card instead of showing two cards with the same heading.
  const mergedBlock = page?.blocks.find((block) => sameTitle(block.title, t.whatHappensNext));
  const otherBlocks = page?.blocks.filter((block) => block !== mergedBlock) ?? [];
  return (
    <>
      {page ? <PageHero eyebrow={page.eyebrow} title={page.title} intro={page.intro} compact /> : null}
      <section className="section-band section-band-tight">
        <div className="container-shell contact-grid">
          <div className="grid gap-5">
            <Reveal>
              <div className="card content-panel">
                <h2>{t.whatHappensNext}</h2>
                <div className="contact-steps">
                  {t.contactSteps.map((step, index) => (
                    <div className={cn("contact-step", tone(index))} key={step}>
                      <span className="step-badge">{index + 1}</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
                {mergedBlock ? (
                  <>
                    <p>{mergedBlock.text}</p>
                    {mergedBlock.items ? (
                      <ul>
                        {mergedBlock.items.map((item) => (
                          <li key={item.title}>
                            <CheckCircle2 size={18} aria-hidden="true" />
                            <span>
                              <strong>{item.title}:</strong> {item.text}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </>
                ) : null}
              </div>
            </Reveal>
            {otherBlocks.map((block) => (
              <Reveal key={block.title}>
                <div className="card content-panel">
                  <h2>{block.title}</h2>
                  <p>{block.text}</p>
                  {block.items ? (
                    <ul>
                      {block.items.map((item) => (
                        <li key={item.title}>
                          <CheckCircle2 size={18} aria-hidden="true" />
                          <span>
                            <strong>{item.title}:</strong> {item.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <ContactForm locale={site.locale} />
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Sections                                                            */
/* ------------------------------------------------------------------ */

type PageBlockLike = {
  eyebrow?: string;
  title: string;
  text: string;
  items?: BasicItem[];
};

function EditorialBlock({ block, cloud = false }: { block: PageBlockLike; cloud?: boolean }) {
  return (
    <section className={cn("section-band", cloud && "section-band-cloud")}>
      <div className="container-shell editorial-grid">
        <SectionIntro eyebrow={block.eyebrow} title={block.title} text={block.text} />
        {block.items?.length ? (
          <Stagger className="feature-grid">
            {block.items.map((item, index) => (
              <StaggerItem key={item.title}>
                <article className={cn("card card-hover feature-card h-full", tone(index))}>
                  <span className="feature-num">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        ) : (
          <Reveal delay={0.1}>
            <div className="accent-panel">
              <Gem size={28} aria-hidden="true" />
              <p>{block.text}</p>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

function ProcessBand({ title, intro, items, detailed = false }: { title: string; intro?: string; items: BasicItem[]; detailed?: boolean }) {
  return (
    <section className="section-band section-band-cloud">
      <div className="container-shell">
        <SectionIntro title={title} text={intro} />
        <div className="process-wrap mt-12">
          <DrawLine className="process-line" />
          <Stagger className={cn("process-grid", detailed && "is-detailed")} stagger={0.08}>
            {items.map((item, index) => (
              <StaggerItem key={item.title} className="h-full">
                <article className={cn("card card-hover process-card h-full", tone(index))}>
                  <span className="step-badge">{index + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

function FeaturedBlocks({ blocks }: { blocks: PageBlockLike[] }) {
  return (
    <section className="section-band">
      <Stagger className="container-shell featured-grid" stagger={0.12}>
        {blocks.map((block, index) => {
          const photo = featuredPhotos[index % featuredPhotos.length];
          return (
            <StaggerItem key={block.title} className="h-full">
              <article className={cn("feature-large h-full", index === 0 && "is-dark")}>
                <div className="feature-large-media">
                  <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 1024px) 100vw, 400px" />
                </div>
                <div className="feature-large-body">
                  {block.eyebrow ? <p className={cn("eyebrow", index === 0 && "eyebrow-light")}>{block.eyebrow}</p> : null}
                  <h2>{block.title}</h2>
                  <p>{block.text}</p>
                  {block.items ? (
                    <ul>
                      {block.items.map((item) => (
                        <li key={item.title}>
                          <strong>{item.title}</strong>
                          <span>{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </article>
            </StaggerItem>
          );
        })}
      </Stagger>
    </section>
  );
}

function ServiceOverview({ locale, services, expanded = false }: { locale: Locale; services: Service[]; expanded?: boolean }) {
  const t = ui[locale];
  const sorted = [...services].sort((a, b) => a.order - b.order);
  return (
    <section className="section-band section-band-cloud">
      <div className="container-shell">
        <SectionIntro eyebrow={t.services} title={t.servicesTitle} text={t.servicesText} />
        <Stagger className={cn("service-grid mt-12", expanded && "is-expanded")}>
          {sorted.map((service, index) => {
            const Icon = serviceIcons[index % serviceIcons.length];
            return (
              <StaggerItem key={service.slug} className="h-full">
                <Link href={withLocale(locale, `/${service.slug}`)} className={cn("card card-hover service-card h-full", tone(index))}>
                  <span className="icon-badge">
                    <Icon size={24} aria-hidden="true" />
                  </span>
                  <h3>{service.title}</h3>
                  <p>{service.summary}</p>
                  <span className="text-link">
                    {t.explore} <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

function OccasionBand({ title, occasions }: { title: string; occasions: string[] }) {
  return (
    <section className="occasion-band">
      <Petals
        opacity={0.5}
        items={[
          { x: "4%", y: "14%", size: 54, color: "var(--gold)", rot: -20, dur: 10, delay: 0 },
          { x: "90%", y: "12%", size: 40, color: "var(--coral)", rot: 30, dur: 12, delay: -3 },
          { x: "80%", y: "78%", size: 46, color: "var(--lavender)", rot: 100, dur: 11, delay: -6 },
          { x: "12%", y: "80%", size: 34, color: "#ffffff", rot: 50, dur: 13, delay: -2 },
        ]}
      />
      <div className="container-shell">
        <Reveal>
          <h2>{title}</h2>
        </Reveal>
        <Stagger className="tag-cloud" stagger={0.045}>
          {occasions.map((item) => (
            <StaggerItem key={item}>
              <span className="tag tag-light">
                <Sparkles size={14} aria-hidden="true" />
                {item}
              </span>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function IndustryBand({ title, items }: { title: string; items: BasicItem[] }) {
  return (
    <section className="section-band">
      <div className="container-shell">
        <SectionIntro title={title} />
        <Stagger className="industry-grid mt-10" stagger={0.06}>
          {items.map((item, index) => {
            const Icon = industryIcons[index % industryIcons.length];
            return (
              <StaggerItem key={item.title} className="h-full">
                <article className={cn("card card-hover industry-card h-full", tone(index))}>
                  <span className="icon-badge" style={{ width: 46, height: 46, borderRadius: 14 }}>
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

function TestimonialsPreview({ site }: { site: SiteContent }) {
  const t = ui[site.locale];
  return (
    <section className="section-band section-band-cloud">
      <div className="container-shell">
        <div className="section-head">
          <SectionIntro eyebrow={t.testimonials} title={t.testimonialsTitle} text={t.testimonialsText} />
          <Reveal delay={0.1}>
            <Link className="button button-secondary" href={withLocale(site.locale, "/testimonials")}>
              {t.testimonials}
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
        <Stagger className="testimonial-grid mt-12">
          {site.testimonials.slice(0, 2).map((item, index) => (
            <StaggerItem key={item.name} className="h-full">
              <TestimonialCard item={item} toneClass={tone(index)} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function TestimonialCard({ item, toneClass }: { item: { name: string; context: string; quote: string }; toneClass: string }) {
  const initials = item.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <figure className={cn("card card-hover testimonial-card h-full", toneClass)}>
      <span className="testimonial-quote-mark" aria-hidden="true">
        &ldquo;
      </span>
      <span className="stars" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={16} fill="currentColor" />
        ))}
      </span>
      <blockquote>&ldquo;{item.quote}&rdquo;</blockquote>
      <figcaption>
        <span className="testimonial-avatar" aria-hidden="true">
          {initials}
        </span>
        <span>
          <strong>{item.name}</strong>
          <span>{item.context}</span>
        </span>
      </figcaption>
    </figure>
  );
}

function GalleryPreview({ site }: { site: SiteContent }) {
  const t = ui[site.locale];
  return (
    <section className="section-band">
      <div className="container-shell">
        <div className="section-head">
          <SectionIntro eyebrow={t.gallery} title={t.galleryTitle} text={t.galleryText} />
          <Reveal delay={0.1}>
            <Link className="button button-blue" href={withLocale(site.locale, "/gallery")}>
              {t.viewGallery}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
        <Stagger className="gallery-preview-row" stagger={0.12}>
          {featuredGalleryProjects.slice(0, 3).map((item) => (
            <StaggerItem key={item.id}>
              <Link href={withLocale(site.locale, "/gallery")} className="polaroid">
                <span className="polaroid-media">
                  <Image src={item.photos[0].src} alt={item.photos[0].alt} fill sizes="(max-width: 640px) 100vw, 380px" className="object-cover" />
                </span>
                <span className="polaroid-caption">
                  <span>
                    {item.title}
                    <br />
                    <small>{item.studio}</small>
                  </span>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function ResourcesPreview({ site }: { site: SiteContent }) {
  const t = ui[site.locale];
  return (
    <section className="section-band section-band-cloud">
      <div className="container-shell">
        <SectionIntro eyebrow={t.resources} title={t.resourcesTitle} text={t.resourcesText} />
        <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
          {site.resources.map((resource, index) => (
            <StaggerItem key={resource.slug} className="h-full">
              <CardLink href={withLocale(site.locale, `/resources/${resource.slug}`)} title={resource.title} text={resource.summary} cta={t.openResource} toneClass={tone(index + 1)} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function FinalCta({ site }: { site: SiteContent }) {
  const t = ui[site.locale];
  return (
    <section className="final-cta">
      <div className="container-shell">
        <Reveal>
          <div className="final-cta-inner">
            <Petals
              opacity={0.55}
              items={[
                { x: "40%", y: "-10%", size: 60, color: "var(--gold)", rot: 20, dur: 11, delay: 0 },
                { x: "92%", y: "60%", size: 50, color: "var(--lavender)", rot: -30, dur: 12, delay: -4 },
                { x: "60%", y: "80%", size: 36, color: "var(--coral)", rot: 120, dur: 10, delay: -2 },
              ]}
            />
            <div>
              <p className="eyebrow eyebrow-light">{t.nextStep}</p>
              <h2>{site.home.finalCta.title}</h2>
              <p>{site.home.finalCta.text}</p>
            </div>
            <div className="final-cta-actions">
              <Link href={withLocale(site.locale, "/contact")} className="button button-primary" data-track="final-primary-cta">
                {site.home.hero.primaryCta.label}
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link href={withLocale(site.locale, "/services")} className="button button-ghost-light" data-track="final-secondary-cta">
                {t.exploreServices}
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Small cards                                                         */
/* ------------------------------------------------------------------ */

function CardLink({ href, title, text, cta, toneClass }: { href: string; title: string; text: string; cta: string; toneClass: string }) {
  return (
    <Link href={href} className={cn("card card-hover card-link h-full", toneClass)}>
      <span className="feature-num">
        <ArrowUpRight size={16} aria-hidden="true" />
      </span>
      <h3>{title}</h3>
      <p>{text}</p>
      <span className="text-link" style={{ color: "var(--tone)" }}>
        {cta}
        <ArrowRight size={16} aria-hidden="true" />
      </span>
    </Link>
  );
}

function PostCard({ post, locale, toneClass }: { post: BlogPost; locale: Locale; toneClass: string }) {
  const t = ui[locale];
  return (
    <Link href={withLocale(locale, `/insights/${post.slug}`)} className={cn("card card-hover post-card h-full", toneClass)}>
      <span className="post-date">{formatDate(post.date, locale)}</span>
      <h2>{post.title}</h2>
      <p>{post.excerpt}</p>
      <span className="text-link" style={{ color: "var(--tone)" }}>
        {t.explore}
        <ArrowRight size={16} aria-hidden="true" />
      </span>
    </Link>
  );
}

function DetailPanel({ title, text, toneClass, index }: { title: string; text: string; toneClass?: string; index?: number }) {
  return (
    <section className={cn("card content-panel", toneClass)}>
      {index ? <span className="feature-num">{String(index).padStart(2, "0")}</span> : null}
      <h2>{title}</h2>
      <p>{text}</p>
    </section>
  );
}
