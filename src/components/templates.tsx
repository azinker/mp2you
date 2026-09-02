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
import { ui } from "@/content/ui";
import { HeroVisual } from "@/components/hero-visual";
import { ContactForm } from "@/components/contact-form";
import { VersionedLink as Link } from "@/components/versioned-link";
import { withLocale } from "@/lib/content";
import { cn, formatDate } from "@/lib/utils";

const serviceIcons = [Gift, PackageCheck, Sparkles, Warehouse, Gamepad2, Globe2];

export function Breadcrumbs({ locale, items }: { locale: Locale; items: { label: string; href: string }[] }) {
  const t = ui[locale];
  return (
    <nav className="container-shell pt-7 text-sm text-stone" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href={withLocale(locale, "/")} className="hover:text-charcoal">
            {t.home}
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
  const t = ui[site.locale];
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
      <ProcessBand title={t.turnkeyProcess} items={site.home.process} />
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
  const t = ui[locale];
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
      <OccasionBand title={t.startingPoints} occasions={service.occasions} />
      <section className="section-band">
        <div className="container-shell">
          <SectionIntro
            eyebrow={t.relatedServices}
            title={t.relatedTitle}
            text={t.relatedText}
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {related.map((item) => (
              <CardLink key={item.slug} href={withLocale(locale, `/${item.slug}`)} title={item.title} text={item.summary} />
            ))}
          </div>
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
      <ProcessBand title={t.howWorkComes} items={site.home.process} />
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
      <section className="section-band section-band-warm">
        <div className="container-shell">
          <SectionIntro
            eyebrow={t.cmsReady}
            title={t.cmsTitle}
            text={t.cmsText}
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
  const t = ui[site.locale];
  return (
    <>
      {page ? <PageHero eyebrow={page.eyebrow} title={page.title} intro={page.intro} primaryCta={page.primaryCta} secondaryCta={page.secondaryCta} /> : null}
      <ProcessBand title={t.fromIdea} items={site.home.process} detailed />
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
            <CaseStudyCard key={item.slug} item={item} href={withLocale(site.locale, `/case-studies/${item.slug}`)} />
          ))}
        </div>
      </section>
    </>
  );
}

export function CaseStudyPage({ locale, item }: { locale: Locale; item: CaseStudy }) {
  const t = ui[locale];
  return (
    <>
      <PageHero eyebrow={item.label} title={item.title} intro={item.summary} compact />
      <section className="section-band">
        <div className="container-narrow grid gap-5">
          <DetailPanel title={t.challenge} text={item.challenge} />
          <DetailPanel title={t.approach} text={item.approach} />
          <DetailPanel title={t.outcome} text={item.outcome} />
        </div>
      </section>
    </>
  );
}

export function InsightsIndex({ site }: { site: SiteContent }) {
  const posts = site.posts.filter((post) => post.status === "published");
  const t = ui[site.locale];
  return (
    <>
      <PageHero
        eyebrow={t.insights}
        title={t.insightsTitle}
        intro={t.insightsText}
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
        <div className="container-narrow grid gap-5">
          {resource.sections.map((section) => (
            <DetailPanel key={section.title} title={section.title} text={section.text} />
          ))}
          <p className="text-sm leading-7 text-stone">
            {t.resourceNote}
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
  const t = ui[locale];
  return (
    <section className="section-band">
      <div className="container-shell">
        <SectionIntro
          eyebrow={t.services}
          title={t.servicesTitle}
          text={t.servicesText}
        />
        <div className={cn("mt-10 grid gap-5", expanded ? "md:grid-cols-2" : "md:grid-cols-3")}>
          {services
            .sort((a, b) => a.order - b.order)
            .map((service, index) => {
              const Icon = serviceIcons[index % serviceIcons.length];
              return (
                <Link href={withLocale(locale, `/${service.slug}`)} className="service-card" key={service.slug}>
                  <Icon size={24} aria-hidden="true" />
                  <h3>{service.title}</h3>
                  <p>{service.summary}</p>
                  <span>
                    {t.explore} <ArrowRight size={16} aria-hidden="true" />
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
  const t = ui[site.locale];
  return (
    <section className="section-band section-band-warm">
      <div className="container-shell">
        <SectionIntro
          eyebrow={t.testimonials}
          title={t.testimonialsTitle}
          text={t.testimonialsText}
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
      <blockquote>&quot;{item.quote}&quot;</blockquote>
      <figcaption>
        <strong>{item.name}</strong>
        <span>{item.context}</span>
      </figcaption>
    </figure>
  );
}

function GalleryPreview({ site }: { site: SiteContent }) {
  const t = ui[site.locale];
  return (
    <section className="section-band">
      <div className="container-shell">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <SectionIntro
            eyebrow={t.gallery}
            title={t.galleryTitle}
            text={t.galleryText}
          />
          <Link className="button button-secondary" href={withLocale(site.locale, "/gallery")}>
            {t.viewGallery}
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
  const t = ui[site.locale];
  return (
    <section className="section-band section-band-warm">
      <div className="container-shell">
        <SectionIntro
          eyebrow={t.resources}
          title={t.resourcesTitle}
          text={t.resourcesText}
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {site.resources.map((resource) => (
            <CardLink
              key={resource.slug}
              href={withLocale(site.locale, `/resources/${resource.slug}`)}
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
  const t = ui[site.locale];
  return (
    <section className="final-cta">
      <div className="container-shell">
        <div className="final-cta-inner">
          <div>
            <p className="eyebrow">{t.nextStep}</p>
            <h2>{site.home.finalCta.title}</h2>
            <p>{site.home.finalCta.text}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link href={withLocale(site.locale, "/contact")} className="button button-primary" data-track="final-primary-cta">
              {site.home.hero.primaryCta.label}
            </Link>
            <Link href={withLocale(site.locale, "/services")} className="button button-secondary" data-track="final-secondary-cta">
              {t.exploreServices}
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
    <Link href={withLocale(locale, `/insights/${post.slug}`)} className="post-card">
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
