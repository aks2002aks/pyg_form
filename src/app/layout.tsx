import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/redux/store/storeProvider";
import NextTopLoader from "nextjs-toploader";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import { Toaster } from "react-hot-toast";
import Provider from "@/context/Provider";

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
    <Provider>
      <StoreProvider>
        <html lang="en">
          <body className={inter.className}>
            <NextTopLoader />
            <Navbar />
            <Toaster />
            {children}
            <Footer />
          </body>
        </html>
      </StoreProvider>
    </Provider>
  );
}
