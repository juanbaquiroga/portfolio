import type { CSSProperties, ReactNode } from 'react';
import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import styles from './Menu.module.scss';

type MenuItem = {
  label: string;
  href?: string;
  onClick?: () => void;
  ariaLabel?: string;
  rotation?: number;
  hoverStyles?: {
    bgColor?: string;
    textColor?: string;
  };
};

export type BubbleMenuProps = {
  onMenuClick?: (open: boolean) => void;
  className?: string;
  style?: CSSProperties;
  menuAriaLabel?: string;
  menuBg?: string;
  menuContentColor?: string;
  useFixedPosition?: boolean;
  items?: MenuItem[];
  animationEase?: string;
  animationDuration?: number;
  staggerDelay?: number;
};

const DEFAULT_ITEMS: MenuItem[] = [
  {
    label: 'Home',
    href: '#main',
    ariaLabel: 'Home',
    rotation: -6,
    hoverStyles: { bgColor: '#e91e8c', textColor: '#ffffff' }
  },
  {
    label: 'What I Do',
    href: '#highlights',
    ariaLabel: 'Highlights',
    rotation: 6,
    hoverStyles: { bgColor: '#e91e8c', textColor: '#ffffff' }
  },
  {
    label: 'About Me',
    href: '#about-me',
    ariaLabel: 'About',
    rotation: -4,
    hoverStyles: { bgColor: '#e91e8c', textColor: '#ffffff' }
  },
  {
    label: 'Tools',
    href: '#technologies',
    ariaLabel: 'Technologies',
    rotation: 4,
    hoverStyles: { bgColor: '#e91e8c', textColor: '#ffffff' }
  },
  {
    label: 'Projects',
    href: '#projects',
    ariaLabel: 'Projects',
    rotation: -6,
    hoverStyles: { bgColor: '#e91e8c', textColor: '#ffffff' }
  },
  {
    label: 'Contact',
    href: '#contact',
    ariaLabel: 'Contact',
    rotation: 6,
    hoverStyles: { bgColor: '#e91e8c', textColor: '#ffffff' }
  }
];

export default function BubbleMenu({
  onMenuClick,
  className,
  style,
  menuAriaLabel = 'Toggle menu',
  menuBg = '#1a1a1a',
  menuContentColor = '#f5f5f5',
  useFixedPosition = false,
  items,
  animationEase = 'power2.out',
  animationDuration = 0.25,
  staggerDelay = 0.04
}: BubbleMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<HTMLAnchorElement[]>([]);
  const labelRefs = useRef<HTMLSpanElement[]>([]);

  const menuItems = items?.length ? items : DEFAULT_ITEMS;

  const containerClassName = [
    styles.bubbleMenu,
    useFixedPosition ? styles.fixed : styles.absolute,
    className
  ]
    .filter(Boolean)
    .join(' ');

  const handleToggle = () => {
    const nextState = !isMenuOpen;
    if (nextState) setShowOverlay(true);
    setIsMenuOpen(nextState);
    onMenuClick?.(nextState);
  };

  useEffect(() => {
    const overlay = overlayRef.current;
    const bubbles = bubblesRef.current.filter(Boolean);
    const labels = labelRefs.current.filter(Boolean);

    if (!overlay || !bubbles.length) return;

    if (isMenuOpen) {
      gsap.set(overlay, { display: 'flex' });
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.set(bubbles, { scale: 0, transformOrigin: '50% 50%' });
      gsap.set(labels, { y: 16, autoAlpha: 0 });

      bubbles.forEach((bubble, i) => {
        const delay = i * staggerDelay;
        const tl = gsap.timeline({ delay });

        tl.to(bubble, {
          scale: 1,
          duration: animationDuration,
          ease: animationEase
        });
        if (labels[i]) {
          tl.to(
            labels[i],
            {
              y: 0,
              autoAlpha: 1,
              duration: animationDuration,
              ease: 'power2.out'
            },
            `-=${animationDuration * 0.8}`
          );
        }
      });
    } else if (showOverlay) {
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.to(labels, {
        y: 16,
        autoAlpha: 0,
        duration: 0.12,
        ease: 'power2.in'
      });
      gsap.to(bubbles, {
        scale: 0,
        duration: 0.12,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(overlay, { display: 'none' });
          setShowOverlay(false);
        }
      });
    }
  }, [isMenuOpen, showOverlay, animationEase, animationDuration, staggerDelay]);

  useEffect(() => {
    const handleResize = () => {
      if (isMenuOpen) {
        const bubbles = bubblesRef.current.filter(Boolean);
        const isDesktop = window.innerWidth >= 900;

        bubbles.forEach((bubble, i) => {
          const item = menuItems[i];
          if (bubble && item) {
            const rotation = isDesktop ? (item.rotation ?? 0) : 0;
            gsap.set(bubble, { rotation });
          }
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen, menuItems]);

  return (
    <>
      <nav className={containerClassName} style={style} aria-label="Main navigation">
        <button
          type="button"
          className={`${styles.bubble} ${styles.toggleBubble} ${styles.menuBtn} ${isMenuOpen ? styles.open : ''}`}
          onClick={handleToggle}
          aria-label={menuAriaLabel}
          aria-pressed={isMenuOpen}
          style={{ background: menuBg, border: '1px solid rgba(255, 255, 255, 0.15)' }}
        >
          <span className={styles.menuLine} style={{ background: menuContentColor }} />
          <span className={`${styles.menuLine} ${styles.short}`} style={{ background: menuContentColor }} />
        </button>
      </nav>
      {showOverlay && (
        <div
          ref={overlayRef}
          className={`${styles.bubbleMenuItems} ${useFixedPosition ? styles.fixed : styles.absolute}`}
          aria-hidden={!isMenuOpen}
        >
          <ul className={styles.pillList} role="menu" aria-label="Menu links">
            {menuItems.map((item, idx) => (
              <li key={idx} role="none" className={styles.pillCol}>
                <a
                  role="menuitem"
                  href={item.href}
                  onClick={(e) => {
                    setIsMenuOpen(false);
                    if (item.onClick) {
                      e.preventDefault();
                      item.onClick();
                    }
                  }}
                  aria-label={item.ariaLabel || item.label}
                  className={styles.pillLink}
                  style={
                    {
                      '--item-rot': `${item.rotation ?? 0}deg`,
                      '--pill-bg': menuBg,
                      '--pill-color': menuContentColor,
                      '--hover-bg': item.hoverStyles?.bgColor || '#e91e8c',
                      '--hover-color': item.hoverStyles?.textColor || '#ffffff'
                    } as CSSProperties
                  }
                  ref={el => {
                    if (el) bubblesRef.current[idx] = el;
                  }}
                >
                  <span
                    className={styles.pillLabel}
                    ref={el => {
                      if (el) labelRefs.current[idx] = el;
                    }}
                  >
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}