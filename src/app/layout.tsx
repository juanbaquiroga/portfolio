import type { Metadata } from "next";
import { Inter, Julius_Sans_One, Poppins } from "next/font/google";
import "@/styles/_globals.scss";

const inter = Inter({ subsets: ["latin"] });
const jls = Julius_Sans_One({ subsets: ["latin"], weight: ["400"] });
const font = Poppins({ subsets: ["latin"], weight:["200","300","400","600"]})

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
      <body className={font.className}>
        {children}
      </body>
    </html>
  );
}
