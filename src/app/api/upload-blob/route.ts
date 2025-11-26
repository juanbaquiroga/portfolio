import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import sharp from "sharp"

export async function POST(request: Request): Promise<NextResponse> {
  const formData = await request.formData();
    // 2. Obtener el archivo usando la clave que definiste en el frontend ('imageFile')
    const fileEntry = formData.get('imageFile');
    const slug = formData.get('slug');
    const name = formData.get('name');

  // const { searchParams } = new URL(request.url);
  // const filename = searchParams.get("filename");
  if (!(fileEntry instanceof File)) {
    return NextResponse.json({ error: 'File is required' }, { status: 400 });
  }

  const arrayBuffer = await fileEntry.arrayBuffer();
  const originalBuffer = Buffer.from(arrayBuffer);

  const webpBuffer = await sharp(originalBuffer)
      .webp({ quality: 80 }) 
      .toBuffer();


  const blob = await put(`images/${slug}/${name}.webp`, webpBuffer, {
    access: "public",
    contentType: "image/webp",
  });
  return NextResponse.json({ url: blob.url });

}