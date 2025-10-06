import type { Metadata } from "next";
import "@/styles/_globals.scss";
import { Analytics } from "@vercel/analytics/react"
import { AuthProvider } from "@/contexts/AuthContext";

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
        <AuthProvider>
          {children}
        </AuthProvider>
        <Analytics/>
      </body>
    </html>
  );
}
