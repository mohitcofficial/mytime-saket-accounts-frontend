import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/context/SideBarContext";
import NextTopLoader from "nextjs-toploader";
import "antd/dist/reset.css";
import { AuthProvider } from "@/context/AuthContext";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MyTime Cowork | Accounts Dashboard",
  description:
    "MyTime Cowork Accounts Dashboard for managing payments, invoices, transactions, collections, and financial operations efficiently.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader showSpinner={false} />
        <AuthProvider>
          <ToastContainer position="bottom-right" autoClose={1500} />
          <SidebarProvider>{children}</SidebarProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
