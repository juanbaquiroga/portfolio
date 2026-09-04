import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/config/firebase";
import { Project, Technology } from "@/interfaces";

// In-memory caching for instant synchronous re-renders on route back-navigation
let cachedProjects: Project[] | null = null;
let cachedTechnologies: Technology[] | null = null;

export const getCachedProjects = (): Project[] | null => cachedProjects;
export const getCachedTechnologies = (): Technology[] | null => cachedTechnologies;

// Projects
export const addProject = async (project: Omit<Project, "id">) => {
  try {
    const docRef = await addDoc(collection(db, "Projects"), project);
    cachedProjects = null;
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getProjects = async (): Promise<Project[]> => {
  if (cachedProjects) return cachedProjects;
  try {
    const querySnapshot = await getDocs(collection(db, "Projects"));
    cachedProjects = querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Project)
    );
    return cachedProjects;
  } catch (e) {
    console.error("Error fetching projects: ", e);
    return [];
  }
};

export const getProjectById = async (id: string): Promise<Project | null> => {
  try {
    if (cachedProjects) {
      const found = cachedProjects.find((p) => p.id === id || p.slug === id);
      if (found) return found;
    }
    const docRef = doc(db, "Projects", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Project;
    }
    // Fallback: search by slug
    const q = query(collection(db, "Projects"), where("slug", "==", id));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const docData = querySnapshot.docs[0];
      return { id: docData.id, ...docData.data() } as Project;
    }
    return null;
  } catch (e) {
    console.error("Error fetching project by id: ", e);
    return null;
  }
};

export const updateProject = async (id: string, project: Partial<Project>) => {
  try {
    await updateDoc(doc(db, "Projects", id), project);
    cachedProjects = null;
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

export const deleteProject = async (id: string) => {
  try {
    await deleteDoc(doc(db, "Projects", id));
    cachedProjects = null;
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
};

// Technologies
export const addTechnology = async (technology: Omit<Technology, "id">) => {
  try {
    const docRef = await addDoc(collection(db, "Technologies"), technology);
    cachedTechnologies = null;
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getTechnologies = async (): Promise<Technology[]> => {
  if (cachedTechnologies) return cachedTechnologies;
  try {
    const querySnapshot = await getDocs(collection(db, "Technologies"));
    cachedTechnologies = querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Technology)
    );
    return cachedTechnologies;
  } catch (e) {
    console.error("Error fetching technologies: ", e);
    return [];
  }
};

export const updateTechnology = async (
  id: string,
  technology: Partial<Technology>
) => {
  try {
    await updateDoc(doc(db, "Technologies", id), technology);
    cachedTechnologies = null;
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

export const deleteTechnology = async (id: string) => {
  try {
    await deleteDoc(doc(db, "Technologies", id));
    cachedTechnologies = null;
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
};