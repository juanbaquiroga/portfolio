"use client";

import { ReactNode } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import BubbleMenu from "@/components/Menu";
import { MenuItem } from "@/interfaces";
import { Background } from "@/components/Background";
import styles from './admin.module.scss'
import { Loading } from "@/components/Loading";



const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuthContext();
  const { handleSignOut } = useAuth();
  const router = useRouter();


  if (loading) {
    return (
        <Loading/>
    )
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  const items: MenuItem[] = [
  {
    label: 'Home',
    href: '/#main',
    ariaLabel: 'Home',
    rotation: -8,
    hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' }
  },
  {
    label: 'Dashboard',
    href: '/admin',
    ariaLabel: 'Dashboard',
    rotation: 8,
    hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' }
  },
  {
    label: 'Projects',
    href: '/admin/projects',
    ariaLabel: 'Projects',
    rotation: 8,
    hoverStyles: { bgColor: '#f59e0b', textColor: '#ffffff' }
  },
  {
    label: 'Technologies',
    href: '/admin/technologies',
    ariaLabel: 'Technologies',
    rotation: 8,
    hoverStyles: { bgColor: '#ef4444', textColor: '#ffffff' }
  },
  {
    label: 'Sign Out',
    onClick: handleSignOut,
    ariaLabel: 'Sign Out',
    rotation: -8,
    hoverStyles: { bgColor: '#8b5cf6', textColor: '#ffffff' }
  }
];

  return (
    <div>
      <Background/>
      <BubbleMenu items={items}/>
      <main>{children}</main>
    </div>
  );
};

export default AdminLayout;