import { Activity, BookOpen, Braces, FileText } from "lucide-react";
import type { NavSection } from "@/components/nav-group";

export const helpSection: NavSection = {
  items: [
    { title: "Documentation", url: "/docs", icon: BookOpen },
    { title: "Swagger", url: "/swagger", icon: Braces },
    { title: "Redoc", url: "/redoc", icon: FileText },
    { title: "Status", url: "/status", icon: Activity },
  ],
};
