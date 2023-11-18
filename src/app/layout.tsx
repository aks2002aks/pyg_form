import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Create_edit_navbar from "@/components/create_edit_navbar/create_edit_navbar";
import { StoreProvider } from "@/redux/store/storeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PYG FORM",
  description: "A Next Gen Form Creater",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </StoreProvider>
  );
}
