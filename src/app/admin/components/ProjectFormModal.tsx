"use client";

import React, { useState, useEffect, useRef } from "react";
import { Project, Technology } from "@/interfaces";
import { getFirebaseAuth } from "@/config/firebase";
import styles from "../Admin.module.scss";

interface ProjectFormModalProps {
  isOpen: boolean;
  project?: Project | null;
  availableTechnologies: Technology[];
  onSave: (project: Omit<Project, "id">, id?: string) => Promise<void>;
  onClose: () => void;
}

export const ProjectFormModal: React.FC<ProjectFormModalProps> = ({
  isOpen,
  project,
  availableTechnologies,
  onSave,
  onClose,
}) => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [descriptionEs, setDescriptionEs] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [selectedTechIds, setSelectedTechIds] = useState<string[]>([]);
  const [links, setLinks] = useState<{ title: string; url: string }[]>([]);
  const [featured, setFeatured] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const coverInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (project) {
      setTitle(project.title || "");
      setSlug(project.slug || "");
      setDescriptionEn(project.description?.en || (typeof project.description === "string" ? project.description : ""));
      setDescriptionEs(project.description?.es || "");
      setCoverImage(project.coverImage || "");
      setImages(project.images && project.images.length > 0 ? [...project.images] : []);
      setSelectedTechIds(project.technologies?.map((t) => t.id) || []);
      setLinks(project.links ? [...project.links] : [{ title: "Live Demo", url: "" }]);
      setFeatured(!!project.featured);
    } else {
      setTitle("");
      setSlug("");
      setDescriptionEn("");
      setDescriptionEs("");
      setCoverImage("");
      setImages([]);
      setSelectedTechIds([]);
      setLinks([
        { title: "Live Demo", url: "" },
        { title: "GitHub", url: "" },
      ]);
      setFeatured(false);
    }
    setError(null);
  }, [project, isOpen]);

  if (!isOpen) return null;

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!project) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/[\s_-]+/g, "-")
          .replace(/^-+|-+$/g, "")
      );
    }
  };

  // Vercel Blob Upload Helper with Auth Token & Content-Type
  const uploadFileToBlob = async (file: File): Promise<string> => {
    const auth = getFirebaseAuth();
    const token = await auth?.currentUser?.getIdToken();

    const headers: Record<string, string> = {
      "Content-Type": file.type || "image/png",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
      method: "POST",
      headers,
      body: file,
    });
    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson.error || "Failed to upload to Vercel Blob");
    }
    const data = await res.json();
    return data.url;
  };

  // Upload Cover Image
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingCover(true);
      setError(null);
      const url = await uploadFileToBlob(file);
      setCoverImage(url);
    } catch (err: any) {
      setError(err?.message || "Cover image upload failed");
    } finally {
      setUploadingCover(false);
      if (coverInputRef.current) coverInputRef.current.value = "";
    }
  };

  // Upload Multiple Gallery Screenshots
  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    try {
      setUploadingGallery(true);
      setError(null);
      const uploadedUrls: string[] = [];

      for (const file of files) {
        const url = await uploadFileToBlob(file);
        uploadedUrls.push(url);
      }

      setImages((prev) => [...prev, ...uploadedUrls]);
    } catch (err: any) {
      setError(err?.message || "Gallery upload failed");
    } finally {
      setUploadingGallery(false);
      if (galleryInputRef.current) galleryInputRef.current.value = "";
    }
  };

  const handleAddImageField = () => {
    setImages((prev) => [...prev, ""]);
  };

  const handleRemoveImageField = (index: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleImageChange = (index: number, val: string) => {
    setImages((prev) => {
      const copy = [...prev];
      copy[index] = val;
      return copy;
    });
  };

  const handleAddLinkField = () => {
    setLinks((prev) => [...prev, { title: "", url: "" }]);
  };

  const handleRemoveLinkField = (index: number) => {
    setLinks((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleLinkChange = (index: number, field: "title" | "url", val: string) => {
    setLinks((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: val };
      return copy;
    });
  };

  const toggleTechnology = (techId: string) => {
    setSelectedTechIds((prev) =>
      prev.includes(techId) ? prev.filter((id) => id !== techId) : [...prev, techId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    if (!coverImage.trim()) {
      setError("Cover image is required");
      return;
    }

    const assignedTechnologies: Technology[] = availableTechnologies.filter((t) =>
      selectedTechIds.includes(t.id)
    );

    const validLinks = links.filter((l) => l.title.trim() !== "" && l.url.trim() !== "");
    const validImages = images.filter((img) => img.trim() !== "");

    try {
      setLoading(true);
      setError(null);
      await onSave(
        {
          title: title.trim(),
          slug: slug.trim() || title.toLowerCase().replace(/\s+/g, "-"),
          description: {
            en: descriptionEn.trim(),
            es: descriptionEs.trim() || descriptionEn.trim(),
          },
          coverImage: coverImage.trim(),
          images: validImages,
          technologies: assignedTechnologies,
          links: validLinks,
          featured,
        },
        project?.id
      );
      onClose();
    } catch (err: any) {
      setError(err?.message || "Failed to save project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={`${styles.modalContent} ${styles.largeModal}`} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>{project ? "Edit Project" : "Add New Project"}</h2>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.errorMessage}>{error}</div>}

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Project Title *</label>
              <input
                type="text"
                placeholder="e.g. My Awesome SaaS"
                value={title}
                onChange={handleTitleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Slug (URL identifier)</label>
              <input
                type="text"
                placeholder="my-awesome-saas"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Description (English) *</label>
              <textarea
                rows={3}
                placeholder="Describe what this project does and key highlights in English..."
                value={descriptionEn}
                onChange={(e) => setDescriptionEn(e.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Description (Spanish)</label>
              <textarea
                rows={3}
                placeholder="Describe el proyecto en español..."
                value={descriptionEs}
                onChange={(e) => setDescriptionEs(e.target.value)}
              />
            </div>
          </div>

          {/* Cover Image with Vercel Blob Upload */}
          <div className={styles.formGroup}>
            <div className={styles.sectionHeaderRow}>
              <label>Cover Image (Upload to Vercel Blob or enter URL) *</label>
              <button
                type="button"
                className={styles.uploadTriggerBtn}
                onClick={() => coverInputRef.current?.click()}
                disabled={uploadingCover}
              >
                {uploadingCover ? "Uploading to Vercel Blob..." : "☁️ Upload File to Vercel Blob"}
              </button>
              <input
                ref={coverInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleCoverUpload}
              />
            </div>

            <input
              type="url"
              placeholder="https://...public.blob.vercel-storage.com/... or /cover.png"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              required
            />

            {coverImage && (
              <div className={styles.coverPreview}>
                <img src={coverImage} alt="Cover preview" />
                <button
                  type="button"
                  className={styles.removeCoverBtn}
                  onClick={() => setCoverImage("")}
                  title="Remove image"
                >
                  ✕ Remove
                </button>
              </div>
            )}
          </div>

          {/* Carousel Screenshots Gallery with Multi-upload */}
          <div className={styles.formGroup}>
            <div className={styles.sectionHeaderRow}>
              <label>Project Screenshots (Carousel Gallery)</label>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  type="button"
                  className={styles.uploadTriggerBtn}
                  onClick={() => galleryInputRef.current?.click()}
                  disabled={uploadingGallery}
                >
                  {uploadingGallery ? "Uploading..." : "☁️ Upload Screenshots"}
                </button>
                <button
                  type="button"
                  className={styles.addSmallBtn}
                  onClick={handleAddImageField}
                >
                  + Add URL Field
                </button>
              </div>
              <input
                ref={galleryInputRef}
                type="file"
                accept="image/*"
                multiple
                style={{ display: "none" }}
                onChange={handleGalleryUpload}
              />
            </div>

            <div className={styles.dynamicList}>
              {images.map((imgUrl, idx) => (
                <div key={idx} className={styles.dynamicItemRow}>
                  {imgUrl && (
                    <img
                      src={imgUrl}
                      alt={`Thumb ${idx + 1}`}
                      className={styles.galleryThumbPreview}
                    />
                  )}
                  <input
                    type="url"
                    placeholder={`Screenshot URL #${idx + 1} (or upload above)`}
                    value={imgUrl}
                    onChange={(e) => handleImageChange(idx, e.target.value)}
                    style={{ flex: 1 }}
                  />
                  <button
                    type="button"
                    className={styles.removeSmallBtn}
                    onClick={() => handleRemoveImageField(idx)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies Multi-select */}
          <div className={styles.formGroup}>
            <label>Assign Technologies & Tools</label>
            <div className={styles.techPillsPicker}>
              {availableTechnologies.map((tech) => {
                const isSelected = selectedTechIds.includes(tech.id);
                return (
                  <button
                    type="button"
                    key={tech.id}
                    className={`${styles.techPickerPill} ${isSelected ? styles.selectedPill : ""}`}
                    onClick={() => toggleTechnology(tech.id)}
                  >
                    {isSelected && <span className={styles.checkMark}>✓ </span>}
                    {tech.title}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Links Builder */}
          <div className={styles.formGroup}>
            <div className={styles.sectionHeaderRow}>
              <label>Project Links & Resources</label>
              <button
                type="button"
                className={styles.addSmallBtn}
                onClick={handleAddLinkField}
              >
                + Add Link
              </button>
            </div>

            <div className={styles.dynamicList}>
              {links.map((link, idx) => (
                <div key={idx} className={styles.dynamicItemRow}>
                  <input
                    type="text"
                    placeholder="Link Title (e.g. Live Demo, GitHub)"
                    value={link.title}
                    onChange={(e) => handleLinkChange(idx, "title", e.target.value)}
                    style={{ flex: 1 }}
                  />
                  <input
                    type="url"
                    placeholder="https://..."
                    value={link.url}
                    onChange={(e) => handleLinkChange(idx, "url", e.target.value)}
                    style={{ flex: 2 }}
                  />
                  <button
                    type="button"
                    className={styles.removeSmallBtn}
                    onClick={() => handleRemoveLinkField(idx)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
              />
              <span>Mark as Featured Project</span>
            </label>
          </div>

          <div className={styles.modalActions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
              disabled={loading || uploadingCover || uploadingGallery}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.primaryActionBtn}
              disabled={loading || uploadingCover || uploadingGallery}
            >
              {loading ? "Saving..." : project ? "Update Project" : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
