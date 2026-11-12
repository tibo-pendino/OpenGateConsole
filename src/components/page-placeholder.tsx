"use client";

import { usePathname } from "next/navigation";
import { Suspense } from "react";

// Titres des pages provisoires, indexés par le dernier segment de l'URL.
const titles: Record<string, string> = {
  models: "Modèles",
  playground: "Bac à sable",
  collections: "Collections",
  documents: "Documents",
  keys: "Clés d'API",
  usage: "Consommation",
  limits: "Limites",
  members: "Membres",
  teams: "Équipes",
  projects: "Projets",
  organizations: "Organisations",
  users: "Utilisateurs",
  routers: "Routeurs",
  providers: "Fournisseurs",
};

function TitleFromPath() {
  const pathname = usePathname();
  const segment = pathname.split("/").filter(Boolean).at(-1) ?? "";
  return titles[segment] ?? segment;
}

/** Page provisoire : affiche le titre de la page et un contenu factice. */
export function PagePlaceholder({ title }: { title?: string }) {
  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight">
        {title ?? (
          // Le chemin n'est connu qu'à l'exécution sur les routes dynamiques.
          <Suspense fallback={null}>
            <TitleFromPath />
          </Suspense>
        )}
      </h1>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
      </div>
      <div className="min-h-[50vh] flex-1 rounded-xl bg-muted/50" />
    </>
  );
}
