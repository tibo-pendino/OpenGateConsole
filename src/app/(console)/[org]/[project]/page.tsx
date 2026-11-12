import { PagePlaceholder } from "@/components/page-placeholder";
import { getCurrentOrganization } from "@/lib/session";

export function generateStaticParams() {
  const organization = getCurrentOrganization();
  return organization.teams.flatMap((team) =>
    team.projects.map((project) => ({
      org: organization.slug,
      project: project.slug,
    })),
  );
}

export default function ProjectDashboardPage() {
  return <PagePlaceholder title="Tableau de bord" />;
}
