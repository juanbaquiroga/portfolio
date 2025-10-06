import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/config/firebase";
import { Project, Technology } from "@/interfaces";

// Projects
export const addProject = async (project: Omit<Project, "id">) => {
  try {
    const docRef = await addDoc(collection(db, "projects"), project);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getProjects = async (): Promise<Project[]> => {
  const querySnapshot = await getDocs(collection(db, "projects"));
  return querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as Project)
  );
};

export const updateProject = async (id: string, project: Partial<Project>) => {
  try {
    await updateDoc(doc(db, "projects", id), project);
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

export const deleteProject = async (id: string) => {
  try {
    await deleteDoc(doc(db, "projects", id));
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
};

// Technologies
export const addTechnology = async (technology: Omit<Technology, "id">) => {
  try {
    const docRef = await addDoc(collection(db, "technologies"), technology);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getTechnologies = async (): Promise<Technology[]> => {
  const querySnapshot = await getDocs(collection(db, "technologies"));
  return querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as Technology)
  );
};

export const updateTechnology = async (
  id: string,
  technology: Partial<Technology>
) => {
  try {
    await updateDoc(doc(db, "technologies", id), technology);
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

export const deleteTechnology = async (id: string) => {
  try {
    await deleteDoc(doc(db, "technologies", id));
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
};