import type { Metadata } from "next";
import "@/styles/_globals.scss";
import { Analytics } from "@vercel/analytics/react"

import { fonts } from "@/lib/fonts";
export const metadata: Metadata = {
  title: "Portfolio",
  description: "Juanba´s portfolio web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fonts.kumbh.className}>
        {children}
        <Analytics/>
      </body>
    </html>
  );
}
