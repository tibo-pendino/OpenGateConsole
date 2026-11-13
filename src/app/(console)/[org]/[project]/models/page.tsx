import { ModelsCatalog } from "@/components/models-catalog";
import { getModels } from "@/lib/models";
import { getProjectParams } from "@/lib/session";

export function generateStaticParams() {
  return getProjectParams();
}

// Ne lit pas `params` : la page entière fait partie du shell statique, partagé
// par tous les projets. Seul le lien « Essayer » dépend du projet (cf. ModelsCatalog).
export default function ModelsPage() {
  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight">Modèles</h1>
      <ModelsCatalog models={getModels()} />
    </>
  );
}
