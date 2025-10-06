"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);

  const {
    signInWithGoogle,
    handleSignInWithEmailAndPassword,
    handleCreateUserWithEmailAndPassword,
  } = useAuth();
  const { user } = useAuthContext();
  const router = useRouter();

  if (user) {
    router.push("/admin");
    return null;
  }

  const handleAuthAction = () => {
    if (isCreatingAccount) {
      handleCreateUserWithEmailAndPassword(email, password, displayName);
    } else {
      handleSignInWithEmailAndPassword(email, password);
    }
  };

  return (
    <div>
      <h1>{isCreatingAccount ? "Create Account" : "Login"}</h1>
      {isCreatingAccount && (
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Display Name"
        />
      )}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleAuthAction}>
        {isCreatingAccount ? "Create Account" : "Sign In"}
      </button>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
      <button onClick={() => setIsCreatingAccount(!isCreatingAccount)}>
        {isCreatingAccount
          ? "Already have an account? Sign In"
          : "Need an account? Create one"}
      </button>
    </div>
  );
};

export default LoginPage;