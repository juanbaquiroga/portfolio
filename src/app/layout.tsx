import type { Metadata, Viewport } from "next";
import "@/styles/_globals.scss";
import { Analytics } from "@vercel/analytics/react"

import { fonts } from "@/lib/fonts";
export const metadata: Metadata = {
  title: "Juan Bautista Quiroga — Full Stack Developer",
  description: "Full Stack Developer specializing in modern web applications with React, Next.js, and Node.js. Building digital products, front to back.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fonts.spaceGrotesk.className}>
        {children}
        <Analytics/>
      </body>
    </html>
  );
}
