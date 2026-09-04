export interface Technology {
  id: string;
  title: string;
  link: string;
  path: string;
  viewBox: string;
  color: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: { en: string; es: string };
  coverImage: string;
  images: string[];
  technologies: Technology[];
  links: { title: string; url: string }[];
  featured: boolean;
}

export interface MenuItem {
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