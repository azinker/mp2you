"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import {
  featuredGalleryProjects,
  galleryProjects,
  galleryStats,
  galleryStudios,
  type GalleryProject,
} from "@/content/gallery-projects";

const stats = galleryStats();

export function ProjectGallery() {
  const [studioId, setStudioId] = useState("all");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);

  const visible = useMemo(
    () => (studioId === "all" ? galleryProjects : galleryProjects.filter((project) => project.studioId === studioId)),
    [studioId],
  );
  const active = visible.find((project) => project.id === activeId) || galleryProjects.find((project) => project.id === activeId);
  const photo = active?.photos[photoIndex];

  useEffect(() => {
    if (!active) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setActiveId(null);
      if (event.key === "ArrowRight") stepPhoto(1);
      if (event.key === "ArrowLeft") stepPhoto(-1);
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, photoIndex]);

  function openProject(project: GalleryProject, index = 0) {
    setActiveId(project.id);
    setPhotoIndex(index);
  }

  function stepPhoto(direction: number) {
    setPhotoIndex((current) => {
      const project = galleryProjects.find((item) => item.id === activeId);
      if (!project) return current;
      return (current + direction + project.photos.length) % project.photos.length;
    });
  }

  return (
    <>
      <section className="project-gallery-proof">
        <div className="container-shell">
          <ul>
            <li>
              <strong>{stats.studios}</strong>
              <span>studios</span>
            </li>
            <li>
              <strong>{stats.programs}</strong>
              <span>completed programs</span>
            </li>
            <li>
              <strong>{stats.photos}</strong>
              <span>production photos</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="section-band project-gallery-featured-band">
        <div className="container-shell">
          <div className="project-gallery-hero">
            {featuredGalleryProjects.slice(0, 3).map((project, index) => (
              <button
                type="button"
                key={project.id}
                className={index === 0 ? "project-hero-tile is-lead" : "project-hero-tile"}
                onClick={() => openProject(project)}
              >
                <Image src={project.photos[0].src} alt={project.photos[0].alt} fill sizes={index === 0 ? "60vw" : "30vw"} className="object-cover" />
                <span>
                  <em>{project.studio}</em>
                  <strong>{project.title}</strong>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-band">
        <div className="container-shell">
          <div className="project-gallery-toolbar">
            <p className="eyebrow">Browse by studio</p>
            <div className="project-gallery-filters" role="tablist" aria-label="Studios">
              <button type="button" className={studioId === "all" ? "is-active" : undefined} onClick={() => setStudioId("all")}>
                All programs
              </button>
              {galleryStudios.map((studio) => (
                <button
                  type="button"
                  key={studio.id}
                  className={studioId === studio.id ? "is-active" : undefined}
                  onClick={() => setStudioId(studio.id)}
                >
                  {studio.label}
                </button>
              ))}
            </div>
          </div>

          <div className="project-gallery-grid">
            {visible.map((project) => (
              <button type="button" key={project.id} className={project.featured ? "project-tile is-featured" : "project-tile"} onClick={() => openProject(project)}>
                <Image src={project.photos[0].src} alt={project.photos[0].alt} fill sizes="(max-width: 700px) 100vw, 33vw" className="object-cover" />
                <span>
                  <em>{project.studio}</em>
                  <strong>{project.title}</strong>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {active && photo ? (
        <div className="project-lightbox" role="dialog" aria-modal="true" aria-label={active.title} onClick={() => setActiveId(null)}>
          <div className="project-lightbox-inner" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="project-lightbox-close" onClick={() => setActiveId(null)} aria-label="Close gallery">
              <X size={18} />
            </button>
            <div className="project-lightbox-image">
              <Image src={photo.src} alt={photo.alt} fill sizes="80vw" className="object-contain" />
              {active.photos.length > 1 ? (
                <>
                  <button type="button" className="project-lightbox-nav is-prev" onClick={() => stepPhoto(-1)} aria-label="Previous photo">
                    ‹
                  </button>
                  <button type="button" className="project-lightbox-nav is-next" onClick={() => stepPhoto(1)} aria-label="Next photo">
                    ›
                  </button>
                </>
              ) : null}
            </div>
            <div className="project-lightbox-copy">
              <p className="eyebrow">{active.studio}</p>
              <h2>{active.title}</h2>
              <p>{active.summary}</p>
              {active.photos.length > 1 ? (
                <p className="project-lightbox-count">
                  {photoIndex + 1} / {active.photos.length}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
