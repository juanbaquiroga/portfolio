"use client";

import { ReactNode } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuthContext();
  const { handleSignOut } = useAuth();
  const router = useRouter();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link href="/admin">Dashboard</Link>
          </li>
          <li>
            <Link href="/admin/projects">Projects</Link>
          </li>
          <li>
            <Link href="/admin/technologies">Technologies</Link>
          </li>
        </ul>
        <button onClick={handleSignOut}>Sign Out</button>
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default AdminLayout;