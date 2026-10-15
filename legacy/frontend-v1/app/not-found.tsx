import { VersionedLink as Link } from "@/components/versioned-link";

export default function NotFound() {
  return (
    <section className="page-hero">
      <div className="container-shell">
        <p className="eyebrow">404</p>
        <h1>This page is not available.</h1>
        <p className="hero-copy">The page may have moved during the rebuild. Start from the homepage or send a project inquiry.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link className="button button-primary" href="/">
            Go Home
          </Link>
          <Link className="button button-secondary" href="/contact">
            Start a Project
          </Link>
        </div>
      </div>
    </section>
  );
}
