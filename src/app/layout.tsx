import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { DNALoader } from "@/components/DNALoader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "S. Barathan | M.Sc. Microbiology",
  description: "Portfolio of S. Barathan, an M.Sc. Microbiology student exploring microbiology, laboratory research, molecular microbiology and applied microbiology.",
  keywords: ["Microbiology", "Applied Microbiology", "Molecular Microbiology", "Researcher", "Laboratory", "Barathan S", "Portfolio"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <DNALoader />
        {children}
      </body>
    </html>
  );
}
