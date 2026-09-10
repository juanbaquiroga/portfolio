import styles from "./Projects.module.scss";
import { useEffect, useRef, useState } from "react";
import { Project } from "@/interfaces";
import { gsap } from "gsap";
import { useGsapInView } from '@/hooks/useGsapInView';
import { getProjects, getCachedProjects } from "@/lib/firebase";
import Link from "next/link";

const ProjectCard = ({ item, index }: { item: Project; index: number }) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const inView = useGsapInView(cardRef as any, { margin: "100000px 0px -60px 0px" });

  useEffect(() => {
    if (!cardRef.current) return;

    if (inView) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 25, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.35,
          delay: 0.12 + (index % 2) * 0.08,
          ease: "power2.out"
        }
      );
    } else {
      gsap.to(cardRef.current, {
        opacity: 0,
        y: 25,
        scale: 0.96,
        duration: 0.22,
        ease: "power2.in"
      });
    }
  }, [inView, index]);

  const descriptionText = item.description?.en || item.description?.es || '';

  return (
    <Link
      ref={cardRef}
      href={`/projects/${item.slug || item.id}`}
      className={styles.projectCard}
      style={{ opacity: 0 }}
    >
      <div className={styles.imageWrapper}>
        <img
          src={item.coverImage || (item.images && item.images[0]) || '/about-me.png'}
          alt={item.title}
          className={styles.image}
        />
        <div className={styles.gradientOverlay} />
      </div>

      <div className={styles.cardContent}>
        {item.technologies && item.technologies.length > 0 && (
          <div className={styles.tagsRow}>
            {item.technologies.slice(0, 3).map((tech) => (
              <span key={tech.id} className={styles.techTag}>
                {tech.title}
              </span>
            ))}
          </div>
        )}

        <h3 className={styles.cardTitle}>{item.title}</h3>
        {descriptionText && (
          <p className={styles.cardDescription}>{descriptionText}</p>
        )}

        <div className={styles.viewProjectIndicator}>
          <span>View project</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export const Projects = ({ isMobile: isMobileProp }: { isMobile?: boolean } = {}) => {
  const [internalIsMobile, setInternalIsMobile] = useState(false);
  const [projects, setProjects] = useState<Project[] | null>(() => getCachedProjects());
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useGsapInView(headerRef as any, { margin: "100000px 0px -60px 0px" });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkMobile = () => setInternalIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const isMobile = isMobileProp ?? internalIsMobile;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const projectsData = await getProjects();
        setProjects(projectsData);
        setError(null);
      } catch (err) {
        console.error("Error fetching data: ", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!headerRef.current) return;
    if (headerInView) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.35, delay: 0.1, ease: "power2.out" }
      );
    } else {
      gsap.to(headerRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.22,
        ease: "power2.in"
      });
    }
  }, [headerInView]);

  const categories = ["All", "Full Stack", "Frontend", "Mobile"];

  const filteredProjects = projects ? projects.filter((p) => {
    if (activeCategory === "All") return true;
    const techTitles = p.technologies?.map(t => t.title.toLowerCase()) || [];
    const desc = (p.description?.en || p.description?.es || '').toLowerCase();
    
    if (activeCategory === "Full Stack") {
      return techTitles.some(t => ['node', 'express', 'firebase', 'mongo', 'postgres', 'sql', 'django'].includes(t)) || desc.includes('full stack') || desc.includes('backend');
    }
    if (activeCategory === "Frontend") {
      return techTitles.some(t => ['react', 'next', 'vue', 'angular', 'tailwind', 'sass', 'css'].includes(t));
    }
    if (activeCategory === "Mobile") {
      return techTitles.some(t => ['react native', 'flutter', 'ios', 'android'].includes(t)) || desc.includes('mobile') || desc.includes('app');
    }
    return true;
  }) : [];

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  const displayedProjects = isMobile ? sortedProjects.slice(0, 6) : sortedProjects;

  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.container}>
        <div ref={headerRef} className={styles.header} style={{ opacity: 0 }}>
          <span className={styles.label}>PROJECTS</span>
          <h2 className={styles.heading}>Built with precision.</h2>
          <p className={styles.subtitle}>
            A curated selection of web applications and digital experiences.
          </p>

          <div className={styles.filterPills}>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`${styles.filterPill} ${activeCategory === cat ? styles.active : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.projectsGrid}>
          {displayedProjects.map((item, index) => (
            <ProjectCard
              key={item.id}
              item={item}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
