"use client";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "@/config/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const useAuth = () => {
  const handleLogin = async (user: any) => {
    const idToken = await user.getIdToken();
    await fetch("/api/session/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken }),
    });
  };

  const checkAndCreateUser = async (user: any) => {
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      const isAdmin =
        user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;
      await setDoc(userRef, {
        email: user.email,
        displayName: user.displayName || "No Name",
        isAdmin,
      });
    }
    await handleLogin(user);
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      await checkAndCreateUser(result.user);
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    }
  };

  const handleSignInWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await handleLogin(result.user);
    } catch (error) {
      console.error("Error signing in with email and password: ", error);
    }
  };

  const handleCreateUserWithEmailAndPassword = async (
    email: string,
    password: string,
    displayName: any
  ) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName });
      await checkAndCreateUser({ ...result.user, displayName });
    } catch (error) {
      console.error("Error creating user with email and password: ", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      await fetch("/api/session/logout", { method: "POST" });
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return {
    signInWithGoogle,
    handleSignInWithEmailAndPassword,
    handleCreateUserWithEmailAndPassword,
    handleSignOut,
  };
};