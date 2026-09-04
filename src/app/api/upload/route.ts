import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename") || `upload-${Date.now()}.png`;

  if (!request.body) {
    return NextResponse.json({ error: "No file data received" }, { status: 400 });
  }

  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    const blob = await put(filename, request.body, {
      access: "public",
      token: token,
    });

    return NextResponse.json(blob);
  } catch (error: any) {
    console.error("Vercel Blob upload error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload image to Vercel Blob" },
      { status: 500 }
    );
  }
}
