import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import * as dotenv from "dotenv";

dotenv.config();
const visbyRound = localFont({
  src: [
    {
      path: "../../public/fonts/VisbyRoundCF-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/VisbyRoundCF-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={visbyRound.className}>{children}</body>
    </html>
  );
}
