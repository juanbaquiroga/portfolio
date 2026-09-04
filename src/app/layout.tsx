import type { Metadata } from "next";
import "@/styles/_globals.scss";
import { Analytics } from "@vercel/analytics/react"

import { fonts } from "@/lib/fonts";
export const metadata: Metadata = {
  title: "Juan Bautista Quiroga — Full Stack Developer",
  description: "Full Stack Developer specializing in modern web applications with React, Next.js, and Node.js. Building digital products, front to back.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body className={fonts.spaceGrotesk.className}>
        {children}
        <Analytics/>
      </body>
    </html>
  );
}
