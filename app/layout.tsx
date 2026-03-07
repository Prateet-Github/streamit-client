import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "@/react-query/provider";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/layout/navbar";

export const metadata: Metadata = {
  title: "StreamIt",
  description: "A video streaming platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <Navbar />
          {children}
          <Toaster position="top-center" />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
