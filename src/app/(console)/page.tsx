import { redirect } from "next/navigation";
import { getCurrentOrganization } from "@/lib/session";

// Redirige vers le premier projet de l'organisation.
export default function Home() {
  const organization = getCurrentOrganization();
  const firstProject = organization.teams[0]?.projects[0];

  if (!firstProject) {
    // TODO : écran « Créez votre premier projet »
    return <p>Aucun projet dans cette organisation.</p>;
  }

  redirect(`/${organization.slug}/${firstProject.slug}`);
}
