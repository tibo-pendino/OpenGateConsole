import { notFound } from "next/navigation";
import { AdminSidebar } from "@/components/admin-sidebar";
import { AppShell } from "@/components/app-shell";
import { getCurrentUser } from "@/lib/session";

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  const user = getCurrentUser();

  // Masque l'espace aux non-admins. Les layouts ne se ré-exécutent pas à
  // chaque navigation : chaque page / appel d'API admin doit aussi vérifier
  // le rôle côté serveur.
  if (!user.isPlatformAdmin) notFound();

  return <AppShell sidebar={<AdminSidebar user={user} />}>{children}</AppShell>;
}
