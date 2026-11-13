// Données fictives, à remplacer par la session et l'API OpenGateLLM.

export type CurrentUser = {
  name: string;
  email: string;
  initials: string;
  isPlatformAdmin: boolean;
};

export type Project = { name: string; slug: string };
export type Team = { name: string; projects: Project[] };
export type Organization = { name: string; slug: string; teams: Team[] };

export function getCurrentUser(): CurrentUser {
  return {
    name: "Tibo Pendino",
    email: "tibo.pendino@numerique.gouv.fr",
    initials: "TP",
    isPlatformAdmin: true,
  };
}

export function getCurrentOrganization(): Organization {
  return {
    name: "Direction Interministérielle du Numérique (DINUM)",
    slug: "dinum",
    teams: [
      {
        name: "Département IAE",
        projects: [
          { name: "Albert API", slug: "albert-api" },
          { name: "Assistant IA", slug: "assistant-ia" },
          { name: "Document IA", slug: "document-ia" },
        ],
      },
      { name: "Département OPI", projects: [] },
      { name: "Département ASN", projects: [] },
      { name: "Département ETR", projects: [] },
      { name: "Département IDO", projects: [] },
    ],
  };
}

/** Paramètres { org, project } de tous les projets, pour generateStaticParams. */
export function getProjectParams() {
  const organization = getCurrentOrganization();
  return organization.teams.flatMap((team) =>
    team.projects.map((project) => ({
      org: organization.slug,
      project: project.slug,
    })),
  );
}
