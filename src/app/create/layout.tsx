import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Create_edit_navbar from "@/components/create_edit_navbar/create_edit_navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PYG FORM",
  description: "Create a form with ease",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Create_edit_navbar />
        {children}
      </body>
    </html>
  );
}
