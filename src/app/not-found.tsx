import { ArrowRight } from "lucide-react";
import { VersionedLink as Link } from "@/components/versioned-link";
import { BowArt } from "@/components/motion";

export default function NotFound() {
  return (
    <section className="page-hero">
      <div className="bg-dots" aria-hidden="true" />
      <BowArt className="page-hero-art" />
      <div className="container-shell" style={{ position: "relative", zIndex: 1 }}>
        <p className="not-found-code text-gradient">404</p>
        <h1 style={{ marginTop: 12 }}>This page is not available.</h1>
        <p className="hero-copy">The page may have moved or no longer exists. Start from the homepage or send a project inquiry.</p>
        <div className="hero-ctas">
          <Link className="button button-primary" href="/">
            Go Home
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
          <Link className="button button-secondary" href="/contact">
            Start a Project
          </Link>
        </div>
      </div>
    </section>
  );
}
