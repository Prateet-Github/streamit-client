import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "@/lib/react-query/provider";
import { Toaster } from "react-hot-toast";

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
          {children}
          <Toaster position="top-center" />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
