import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { initializeApp, getApps } from "firebase-admin/app";
import serviceAccount from "@/config/serviceAccount";
import { cert } from "firebase-admin/app";
const adminApp =
  getApps().find((app) => app.name === "admin") ||
  initializeApp(
    {
      credential: cert(serviceAccount),
    },
    "admin"
  );

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value;

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const decodedClaims = await getAuth(adminApp).verifySessionCookie(
      session,
      true
    );
    const userDoc = await getFirestore(adminApp)
      .collection("users")
      .doc(decodedClaims.uid)
      .get();
    if (!userDoc.exists || !userDoc.data()?.isAdmin) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: "/admin/:path*",
};