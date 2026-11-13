import { PagePlaceholder } from "@/components/page-placeholder";
import { getProjectParams } from "@/lib/session";

export function generateStaticParams() {
  return getProjectParams();
}

export default function ProjectDashboardPage() {
  return <PagePlaceholder title="Tableau de bord" />;
}
