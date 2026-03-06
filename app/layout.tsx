import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "@/react-query/provider";

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
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
