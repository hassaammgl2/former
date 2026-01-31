import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Former",
  description: "Used for building form for your works",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
