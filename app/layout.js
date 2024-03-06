"use client"

import { Inter } from "next/font/google";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import "./ui/globals.css";

const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient()

const metadata = {
  title: "Map",
  description: "Map",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <body className={inter.className}>{children}</body>
      </QueryClientProvider>
    </html>
  );
}
