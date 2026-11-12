import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OpenGate Console",
  description: "Console d'administration OpenGate",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>
        <TooltipProvider>
          {/* Ici et non dans chaque espace : l'état ouvert/fermé de la sidebar
              doit survivre au passage console ↔ espace admin. */}
          <SidebarProvider>{children}</SidebarProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
