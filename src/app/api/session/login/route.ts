import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { initializeApp, getApps } from "firebase-admin/app";
import { serviceAccount } from "@/config/serviceAccount";
import { getFirestore } from "firebase-admin/firestore";

const adminApp =
  getApps().find((app) => app.name === "admin") ||
  initializeApp(
    {
      credential: {
        projectId: serviceAccount.project_id,
        clientEmail: serviceAccount.client_email,
        privateKey: serviceAccount.private_key,
      },
      databaseURL: `https://{serviceAccount.project_id}.firebaseio.com`,
    },
    "admin"
  );

export async function POST(request: Request) {
  const { idToken } = await request.json();

  if (!idToken) {
    return NextResponse.json(
      { error: "ID token is required" },
      { status: 400 }
    );
  }

  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

  try {
    const decodedIdToken = await getAuth(adminApp).verifyIdToken(idToken);
    const uid = decodedIdToken.uid;

    const db = getFirestore(adminApp);
    const userDoc = await db.collection("users").doc(uid).get();

    if (!userDoc.exists || !userDoc.data()?.isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const sessionCookie = await getAuth(adminApp).createSessionCookie(idToken, {
      expiresIn,
    });

    const options = {
      name: "session",
      value: sessionCookie,
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
    };

    const response = NextResponse.json({ status: "success" }, { status: 200 });
    response.cookies.set(options);

    return response;
  } catch (error) {
    console.error("Error creating session cookie:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}