"use client";

import React, { useState, useEffect } from "react";
import { Technology } from "@/interfaces";
import styles from "../Admin.module.scss";

interface TechFormModalProps {
  isOpen: boolean;
  technology?: Technology | null;
  onSave: (tech: Omit<Technology, "id">, id?: string) => Promise<void>;
  onClose: () => void;
}

export const TechFormModal: React.FC<TechFormModalProps> = ({
  isOpen,
  technology,
  onSave,
  onClose,
}) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [viewBox, setViewBox] = useState("0 0 24 24");
  const [path, setPath] = useState("");
  const [color, setColor] = useState("#e91e8c");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (technology) {
      setTitle(technology.title || "");
      setLink(technology.link || "");
      setViewBox(technology.viewBox || "0 0 24 24");
      setPath(technology.path || "");
      setColor(technology.color || "#e91e8c");
    } else {
      setTitle("");
      setLink("");
      setViewBox("0 0 24 24");
      setPath("");
      setColor("#e91e8c");
    }
    setError(null);
  }, [technology, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    if (!path.trim()) {
      setError("SVG Path (d attribute) is required");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await onSave(
        {
          title: title.trim(),
          link: link.trim(),
          viewBox: viewBox.trim() || "0 0 24 24",
          path: path.trim(),
          color: color.trim() || "#e91e8c",
        },
        technology?.id
      );
      onClose();
    } catch (err: any) {
      setError(err?.message || "Failed to save technology");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>{technology ? "Edit Technology" : "Add New Technology"}</h2>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.errorMessage}>{error}</div>}

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Technology Name *</label>
              <input
                type="text"
                placeholder="e.g. Next.js, TypeScript, PostgreSQL"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Website / Docs Link</label>
              <input
                type="url"
                placeholder="https://nextjs.org"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>SVG viewBox</label>
              <input
                type="text"
                placeholder="0 0 24 24 or 0 0 128 128"
                value={viewBox}
                onChange={(e) => setViewBox(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Accent Color</label>
              <div className={styles.colorPickerWrapper}>
                <input
                  type="color"
                  value={color.startsWith("#") ? color : "#e91e8c"}
                  onChange={(e) => setColor(e.target.value)}
                  className={styles.colorInput}
                />
                <input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  placeholder="#e91e8c"
                />
              </div>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>SVG Path (d attribute) *</label>
            <textarea
              rows={4}
              placeholder="Paste the 'd' attribute from an SVG icon (e.g. M12 2L2 7l10 5...)"
              value={path}
              onChange={(e) => setPath(e.target.value)}
              required
            />
          </div>

          {/* Live SVG Preview Box */}
          <div className={styles.previewSection}>
            <label>Live Icon Preview:</label>
            <div className={styles.iconPreviewBox}>
              {path ? (
                <svg viewBox={viewBox || "0 0 24 24"} className={styles.previewSvg}>
                  <path d={path} fill="currentColor" />
                </svg>
              ) : (
                <span className={styles.noPreviewText}>Enter SVG path to see preview</span>
              )}
            </div>
          </div>

          <div className={styles.modalActions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.primaryActionBtn}
              disabled={loading}
            >
              {loading ? "Saving..." : technology ? "Update Technology" : "Create Technology"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
