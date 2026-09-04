import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

// Allowed MIME types for uploads
const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
]);

// Maximum file size: 10 MB
const MAX_FILE_SIZE = 10 * 1024 * 1024;

export async function POST(request: Request): Promise<NextResponse> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "Server storage token is not configured" },
      { status: 500 }
    );
  }

  // Authorization check in production
  const authHeader = request.headers.get("authorization");
  const isDev = process.env.NODE_ENV === "development";

  if (!isDev && !authHeader) {
    return NextResponse.json(
      { error: "Unauthorized: Missing authentication token" },
      { status: 401 }
    );
  }

  // Validate Content-Type
  const contentType = request.headers.get("content-type") || "";
  if (!contentType || !ALLOWED_MIME_TYPES.has(contentType)) {
    return NextResponse.json(
      { error: `Invalid file type '${contentType}'. Only images (JPEG, PNG, WebP, GIF, AVIF) are allowed.` },
      { status: 400 }
    );
  }

  // Validate Content-Length
  const contentLength = parseInt(request.headers.get("content-length") || "0", 10);
  if (contentLength > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: "File size exceeds the 10MB limit" },
      { status: 400 }
    );
  }

  if (!request.body) {
    return NextResponse.json({ error: "No file data received" }, { status: 400 });
  }

  // Sanitize filename: strip path characters and generate a clean, safe name
  const { searchParams } = new URL(request.url);
  const rawFilename = searchParams.get("filename") || "image.png";
  const cleanExt = rawFilename.split(".").pop()?.replace(/[^a-zA-Z0-9]/g, "").toLowerCase() || "png";
  const safeFilename = `portfolio-${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${cleanExt}`;

  try {
    const blob = await put(safeFilename, request.body, {
      access: "public",
      token: token,
      contentType: contentType,
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
