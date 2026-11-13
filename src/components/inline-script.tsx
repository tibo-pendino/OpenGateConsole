// Script exécuté pendant le parsing du HTML, avant le premier rendu : permet
// de corriger le DOM pré-rendu (statique) avec une valeur côté client sans
// flash. Côté client, le type "text/plain" évite que React ne l'exécute ou ne
// le signale ; suppressHydrationWarning absorbe la différence de type.
// Cf. node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      // biome-ignore lint/security/noDangerouslySetInnerHtml: script statique, sans donnée utilisateur
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
