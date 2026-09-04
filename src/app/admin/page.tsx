"use client";

import React, { useState, useEffect } from "react";
import { Project, Technology } from "@/interfaces";
import {
  getProjects,
  getTechnologies,
  addProject,
  updateProject,
  deleteProject,
  addTechnology,
  updateTechnology,
  deleteTechnology,
} from "@/lib/firebase";
import { getFirebaseAuth } from "@/config/firebase";
import { onAuthStateChanged, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { ProjectFormModal } from "./components/ProjectFormModal";
import { TechFormModal } from "./components/TechFormModal";
import { DeleteConfirmModal } from "./components/DeleteConfirmModal";
import styles from "./Admin.module.scss";
import Link from "next/link";

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [authChecking, setAuthChecking] = useState(true);
  const [activeTab, setActiveTab] = useState<"projects" | "technologies">("projects");

  // Data
  const [projects, setProjects] = useState<Project[]>([]);
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  // Modals state
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [isTechModalOpen, setIsTechModalOpen] = useState(false);
  const [editingTech, setEditingTech] = useState<Technology | null>(null);

  const [deleteItem, setDeleteItem] = useState<{ type: "project" | "tech"; id: string; name: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Login form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [devBypass, setDevBypass] = useState(false);

  // Auth observer
  useEffect(() => {
    const auth = getFirebaseAuth();
    if (!auth) {
      setAuthChecking(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthChecking(false);
    });
    return () => unsubscribe();
  }, []);

  // Fetch initial data
  const fetchData = async () => {
    try {
      setLoadingData(true);
      const [projectsList, techsList] = await Promise.all([
        getProjects(),
        getTechnologies(),
      ]);
      setProjects(projectsList);
      setTechnologies(techsList);
    } catch (err) {
      console.error("Error loading admin data:", err);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (user || devBypass) {
      fetchData();
    }
  }, [user, devBypass]);

  // Login handlers
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const auth = getFirebaseAuth();
    if (!auth) {
      setLoginError("Firebase Auth is not initialized. Using local dev access.");
      setDevBypass(true);
      return;
    }
    try {
      setIsLoggingIn(true);
      setLoginError(null);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      console.error("Login error:", err);
      setLoginError(err?.message || "Invalid credentials");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleGoogleLogin = async () => {
    const auth = getFirebaseAuth();
    if (!auth) {
      setDevBypass(true);
      return;
    }
    try {
      setIsLoggingIn(true);
      setLoginError(null);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      console.error("Google login error:", err);
      setLoginError(err?.message || "Google sign in failed");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    const auth = getFirebaseAuth();
    if (auth) {
      await signOut(auth);
    }
    setUser(null);
    setDevBypass(false);
  };

  // Project CRUD Handlers
  const handleSaveProject = async (projectData: Omit<Project, "id">, id?: string) => {
    if (id) {
      await updateProject(id, projectData);
    } else {
      await addProject(projectData);
    }
    await fetchData();
  };

  // Tech CRUD Handlers
  const handleSaveTech = async (techData: Omit<Technology, "id">, id?: string) => {
    if (id) {
      await updateTechnology(id, techData);
    } else {
      await addTechnology(techData);
    }
    await fetchData();
  };

  // Delete Handler
  const handleConfirmDelete = async () => {
    if (!deleteItem) return;
    try {
      setIsDeleting(true);
      if (deleteItem.type === "project") {
        await deleteProject(deleteItem.id);
      } else {
        await deleteTechnology(deleteItem.id);
      }
      setDeleteItem(null);
      await fetchData();
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  if (authChecking) {
    return (
      <div className={styles.adminPage} style={{ alignItems: "center", justifyContent: "center" }}>
        <p>Checking authentication...</p>
      </div>
    );
  }

  // If not logged in and dev bypass not active, show login screen
  if (!user && !devBypass) {
    return (
      <div className={styles.loginWrapper}>
        <div className={styles.loginCard}>
          <div className={styles.loginHeader}>
            <h1>Admin Panel</h1>
            <p>Sign in to manage projects, skills, and portfolio database.</p>
          </div>

          {loginError && <div className={styles.errorMessage}>{loginError}</div>}

          <form onSubmit={handleEmailLogin} className={styles.loginForm}>
            <div className={styles.formGroup}>
              <label>Email</label>
              <input
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className={styles.loginSubmitBtn}
              disabled={isLoggingIn}
            >
              {isLoggingIn ? "Signing in..." : "Sign In with Email"}
            </button>
          </form>

          <div className={styles.divider}>
            <span>OR</span>
          </div>

          <button
            type="button"
            className={styles.googleLoginBtn}
            onClick={handleGoogleLogin}
            disabled={isLoggingIn}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.97 0 12s.46 3.84 1.26 5.42l4.02-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            Sign In with Google
          </button>

          {/* Quick Local Development Access */}
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={() => setDevBypass(true)}
            style={{ fontSize: "0.82rem", textAlign: "center" }}
          >
            ⚡ Continue as Local Dev (Bypass Auth)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.adminPage}>
      {/* Top Navbar */}
      <header className={styles.navbar}>
        <div className={styles.brand}>
          <span className={styles.brandBadge}>ADMIN</span>
          <span className={styles.brandTitle}>Database Management</span>
        </div>

        <div className={styles.navActions}>
          <Link href="/" className={styles.viewSiteLink} target="_blank">
            <span>View Live Site</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </Link>
          <button type="button" className={styles.logoutBtn} onClick={handleLogout}>
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className={styles.container}>
        {/* Navigation Tabs Header */}
        <div className={styles.tabsHeader}>
          <div className={styles.tabs}>
            <button
              type="button"
              className={`${styles.tabBtn} ${activeTab === "projects" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("projects")}
            >
              <span>📁 Projects</span>
              <span className={styles.tabCount}>{projects.length}</span>
            </button>

            <button
              type="button"
              className={`${styles.tabBtn} ${activeTab === "technologies" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("technologies")}
            >
              <span>⚡ Technologies & Tools</span>
              <span className={styles.tabCount}>{technologies.length}</span>
            </button>
          </div>

          <div>
            {activeTab === "projects" ? (
              <button
                type="button"
                className={styles.primaryActionBtn}
                onClick={() => {
                  setEditingProject(null);
                  setIsProjectModalOpen(true);
                }}
              >
                + Add Project
              </button>
            ) : (
              <button
                type="button"
                className={styles.primaryActionBtn}
                onClick={() => {
                  setEditingTech(null);
                  setIsTechModalOpen(true);
                }}
              >
                + Add Technology
              </button>
            )}
          </div>
        </div>

        {/* Tab 1: Projects Manager */}
        {activeTab === "projects" && (
          <div className={styles.panel}>
            {loadingData ? (
              <div className={styles.emptyState}>Loading projects...</div>
            ) : projects.length === 0 ? (
              <div className={styles.emptyState}>
                No projects found in database. Click &quot;+ Add Project&quot; to create your first project.
              </div>
            ) : (
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Project</th>
                      <th>Status</th>
                      <th>Technologies</th>
                      <th>Links</th>
                      <th style={{ textAlign: "right" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((proj) => (
                      <tr key={proj.id}>
                        <td>
                          <div className={styles.projectCell}>
                            <img
                              src={proj.coverImage || "/about-me.png"}
                              alt={proj.title}
                              className={styles.projectThumb}
                            />
                            <div className={styles.projectTitleRow}>
                              <span className={styles.projectTitle}>{proj.title}</span>
                              <span className={styles.projectSlug}>/projects/{proj.slug || proj.id}</span>
                            </div>
                          </div>
                        </td>

                        <td>
                          {proj.featured ? (
                            <span className={styles.featuredBadge}>★ Featured</span>
                          ) : (
                            <span style={{ color: "#71717a", fontSize: "0.8rem" }}>Standard</span>
                          )}
                        </td>

                        <td>
                          <div style={{ maxWidth: "250px", display: "flex", flexWrap: "wrap" }}>
                            {proj.technologies && proj.technologies.length > 0 ? (
                              proj.technologies.slice(0, 3).map((t) => (
                                <span key={t.id} className={styles.tagPill}>
                                  {t.title}
                                </span>
                              ))
                            ) : (
                              <span style={{ color: "#71717a", fontSize: "0.8rem" }}>None</span>
                            )}
                            {proj.technologies && proj.technologies.length > 3 && (
                              <span className={styles.tagPill}>+{proj.technologies.length - 3}</span>
                            )}
                          </div>
                        </td>

                        <td>
                          <span style={{ fontSize: "0.85rem", color: "#a1a1aa" }}>
                            {proj.links?.length || 0} links • {proj.images?.length || 0} photos
                          </span>
                        </td>

                        <td>
                          <div className={styles.actionBtnGroup} style={{ justifyContent: "flex-end" }}>
                            <button
                              type="button"
                              className={styles.editBtn}
                              onClick={() => {
                                setEditingProject(proj);
                                setIsProjectModalOpen(true);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              className={styles.deleteBtn}
                              onClick={() =>
                                setDeleteItem({
                                  type: "project",
                                  id: proj.id,
                                  name: proj.title,
                                })
                              }
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Technologies Manager */}
        {activeTab === "technologies" && (
          <div className={styles.panel}>
            {loadingData ? (
              <div className={styles.emptyState}>Loading technologies...</div>
            ) : technologies.length === 0 ? (
              <div className={styles.emptyState}>
                No technologies found in database. Click &quot;+ Add Technology&quot; to create one.
              </div>
            ) : (
              <div className={styles.techCardsGrid}>
                {technologies.map((tech) => (
                  <div key={tech.id} className={styles.techCardItem}>
                    <div className={styles.techCardTop}>
                      <div className={styles.techIconBox}>
                        <svg viewBox={tech.viewBox || "0 0 24 24"}>
                          <path d={tech.path} fill="currentColor" />
                        </svg>
                      </div>
                      <div className={styles.techTitleInfo}>
                        <span className={styles.techName}>{tech.title}</span>
                        {tech.link && (
                          <a
                            href={tech.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.techLink}
                          >
                            {tech.link.replace(/^https?:\/\//, "")}
                          </a>
                        )}
                      </div>
                    </div>

                    <div className={styles.actionBtnGroup} style={{ marginTop: "auto", paddingTop: "0.5rem" }}>
                      <button
                        type="button"
                        className={styles.editBtn}
                        onClick={() => {
                          setEditingTech(tech);
                          setIsTechModalOpen(true);
                        }}
                        style={{ flex: 1 }}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className={styles.deleteBtn}
                        onClick={() =>
                          setDeleteItem({
                            type: "tech",
                            id: tech.id,
                            name: tech.title,
                          })
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Project Form Modal */}
      <ProjectFormModal
        isOpen={isProjectModalOpen}
        project={editingProject}
        availableTechnologies={technologies}
        onSave={handleSaveProject}
        onClose={() => {
          setIsProjectModalOpen(false);
          setEditingProject(null);
        }}
      />

      {/* Tech Form Modal */}
      <TechFormModal
        isOpen={isTechModalOpen}
        technology={editingTech}
        onSave={handleSaveTech}
        onClose={() => {
          setIsTechModalOpen(false);
          setEditingTech(null);
        }}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!deleteItem}
        title={deleteItem?.type === "project" ? "Delete Project" : "Delete Technology"}
        itemName={deleteItem?.name || ""}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteItem(null)}
        isLoading={isDeleting}
      />
    </div>
  );
}
