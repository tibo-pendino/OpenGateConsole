import type { ReactNode } from "react";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

/**
 * Structure commune : sidebar + en-tête + contenu.
 * Le SidebarProvider est dans le layout racine pour que l'état ouvert/fermé
 * soit partagé entre la console et l'espace admin.
 */
export function AppShell({
  sidebar,
  children,
}: {
  sidebar: ReactNode;
  children: ReactNode;
}) {
  return (
    <>
      {sidebar}
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4">{children}</main>
      </SidebarInset>
    </>
  );
}
