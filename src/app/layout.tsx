import type { Metadata } from "next";
import { Inter, Licorice } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const licorice = Licorice({
  variable: "--font-licorice",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Barber Certificated",
  description: "A platform for selling barbers products and services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${licorice.variable} antialiased bg-[#F9FAFB] font-inter`}>
        {children}
      </body>
    </html>
  );
}
