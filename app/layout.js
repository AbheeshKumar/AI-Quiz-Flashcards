import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "./Components/navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Quiz Maker",
  description: "Create quizzes from your study",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
