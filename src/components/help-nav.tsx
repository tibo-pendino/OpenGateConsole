import { Activity, BookOpen, Braces, FileText } from "lucide-react";
import type { NavSection } from "@/components/nav-group";

// Liens externes : ouverts dans un nouvel onglet (cf. NavGroup).
export const helpSection: NavSection = {
  items: [
    {
      title: "Documentation",
      url: "https://guides.ia.numerique.gouv.fr/albert-api",
      icon: BookOpen,
    },
    {
      title: "Swagger",
      url: "https://albert.api.etalab.gouv.fr/swagger",
      icon: Braces,
    },
    {
      title: "Redoc",
      url: "https://albert.api.etalab.gouv.fr/reference",
      icon: FileText,
    },
    {
      title: "Status",
      url: "https://albert.status.etalab.gouv.fr/",
      icon: Activity,
    },
  ],
};
