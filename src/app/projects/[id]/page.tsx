"use client";

import { useEffect, useState, use } from "react";
import { Project } from "@/interfaces";
import { getProjectById } from "@/lib/firebase";
import { Background } from "@/components/Background";
import Menu from "@/components/Menu";
import styles from "./ProjectDetail.module.scss";
import Link from "next/link";

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const projectId = resolvedParams.id;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const data = await getProjectById(projectId);
        setProject(data);
      } catch (err) {
        console.error("Error fetching project:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [projectId]);

  const imagesList = project
    ? (project.images && project.images.length > 0 ? project.images : [project.coverImage]).filter(Boolean)
    : [];

  const handleNextImage = () => {
    if (imagesList.length > 0) {
      setActiveImageIndex((prev) => (prev + 1) % imagesList.length);
    }
  };

  const handlePrevImage = () => {
    if (imagesList.length > 0) {
      setActiveImageIndex((prev) => (prev - 1 + imagesList.length) % imagesList.length);
    }
  };

  if (loading) {
    return (
      <main className={styles.loadingContainer}>
        <Background />
        <div className={styles.spinner} />
        <p>Loading project details...</p>
      </main>
    );
  }

  if (!project) {
    return (
      <main className={styles.notFoundContainer}>
        <Background />
        <Menu useFixedPosition={true} />
        <div className={styles.notFoundContent}>
          <h1>Project not found</h1>
          <p>The project you are looking for does not exist or has been moved.</p>
          <Link href="/#projects" className={styles.backButton}>
            ← Back to Projects
          </Link>
        </div>
      </main>
    );
  }

  const descriptionEn = project.description?.en || "";
  const descriptionEs = project.description?.es || "";
  const primaryDesc = descriptionEn || descriptionEs;
  const secondaryDesc = descriptionEs && descriptionEs !== descriptionEn ? descriptionEs : null;

  return (
    <>
      <Background />
      <Menu useFixedPosition={true} />

      <main className={styles.page}>
        <div className={styles.container}>
          {/* Top Navigation */}
          <div className={styles.topNav}>
            <Link href="/#projects" className={styles.backLink}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              <span>Back to all projects</span>
            </Link>
          </div>

          {/* Project Header */}
          <header className={styles.header}>
            <div className={styles.headerMeta}>
              <span className={styles.badge}>Featured Project</span>
            </div>
            <h1 className={styles.title}>{project.title}</h1>
            {primaryDesc && (
              <p className={styles.leadDescription}>{primaryDesc}</p>
            )}

            {/* Action Buttons */}
            {project.links && project.links.length > 0 && (
              <div className={styles.actions}>
                {project.links.map((link, idx) => {
                  const isPrimary = idx === 0;
                  return (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={isPrimary ? styles.primaryBtn : styles.secondaryBtn}
                    >
                      <span>{link.title}</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </a>
                  );
                })}
              </div>
            )}
          </header>

          {/* Image Carousel */}
          {imagesList.length > 0 && (
            <section className={styles.carouselSection}>
              <div className={styles.carouselContainer}>
                <div className={styles.mainImageWrapper}>
                  <img
                    src={imagesList[activeImageIndex]}
                    alt={`${project.title} screenshot ${activeImageIndex + 1}`}
                    className={styles.carouselImage}
                  />

                  {imagesList.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={handlePrevImage}
                        className={`${styles.navButton} ${styles.prevButton}`}
                        aria-label="Previous image"
                      >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="15 18 9 12 15 6" />
                        </svg>
                      </button>

                      <button
                        type="button"
                        onClick={handleNextImage}
                        className={`${styles.navButton} ${styles.nextButton}`}
                        aria-label="Next image"
                      >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </button>

                      <div className={styles.counterBadge}>
                        {activeImageIndex + 1} / {imagesList.length}
                      </div>
                    </>
                  )}
                </div>

                {/* Thumbnails Row */}
                {imagesList.length > 1 && (
                  <div className={styles.thumbnails}>
                    {imagesList.map((imgUrl, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveImageIndex(idx)}
                        className={`${styles.thumbBtn} ${idx === activeImageIndex ? styles.activeThumb : ""}`}
                      >
                        <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className={styles.thumbImage} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Project Details Grid */}
          <div className={styles.detailsGrid}>
            <div className={styles.mainInfo}>
              <h2 className={styles.sectionHeading}>About the Project</h2>
              <div className={styles.articleContent}>
                <p>{primaryDesc}</p>
                {secondaryDesc && (
                  <p className={styles.secondaryLang}>{secondaryDesc}</p>
                )}
              </div>
            </div>

            <aside className={styles.sidebar}>
              {/* Technologies */}
              {project.technologies && project.technologies.length > 0 && (
                <div className={styles.sidebarCard}>
                  <h3 className={styles.sidebarTitle}>Technologies Used</h3>
                  <div className={styles.techList}>
                    {project.technologies.map((tech) => (
                      <div key={tech.id} className={styles.techItem}>
                        {tech.viewBox && tech.path ? (
                          <svg viewBox={tech.viewBox} className={styles.techSvg}>
                            <path d={tech.path} fill="currentColor" />
                          </svg>
                        ) : (
                          <span className={styles.bulletDot} />
                        )}
                        <span>{tech.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Links */}
              {project.links && project.links.length > 0 && (
                <div className={styles.sidebarCard}>
                  <h3 className={styles.sidebarTitle}>Project Links</h3>
                  <div className={styles.linksList}>
                    {project.links.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.linkRow}
                      >
                        <span>{link.title}</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>

          {/* Bottom CTA Banner */}
          <section className={styles.bottomCta}>
            <div className={styles.ctaCard}>
              <h3>Interested in collaborating?</h3>
              <p>Let&apos;s build innovative digital products together.</p>
              <div className={styles.ctaButtons}>
                <Link href="/#contact" className={styles.primaryBtn}>
                  Get in Touch
                </Link>
                <Link href="/#projects" className={styles.secondaryBtn}>
                  Explore More Work
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
