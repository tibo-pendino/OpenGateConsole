"use client";

import { Check, Copy, ExternalLink, FlaskConical, Search } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  MODELS_DOC_URL,
  type Model,
  type ModelUsage,
  usageGroups,
} from "@/lib/models";

// Fuseau fixé : même rendu côté serveur et côté client.
const dateFormat = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

function matches(model: Model, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return [model.id, model.model, model.provider, model.description].some(
    (field) => field.toLowerCase().includes(q),
  );
}

export function ModelsCatalog({ models }: { models: Model[] }) {
  const [usage, setUsage] = useState<ModelUsage | null>(null);
  const [query, setQuery] = useState("");

  const visible = models.filter((m) => matches(m, query));
  const groups = usageGroups
    .filter((g) => usage === null || g.usage === usage)
    .map((g) => ({ ...g, models: visible.filter((m) => m.usage === g.usage) }))
    .filter((g) => g.models.length > 0);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative md:w-72">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher un modèle"
            aria-label="Rechercher un modèle"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {[{ usage: null, label: "Tous" }, ...usageGroups].map((g) => (
            <Button
              key={g.label}
              size="sm"
              variant={usage === g.usage ? "default" : "outline"}
              aria-pressed={usage === g.usage}
              onClick={() => setUsage(g.usage)}
            >
              {g.label}
            </Button>
          ))}
        </div>
      </div>

      {groups.length === 0 && (
        <p className="py-12 text-center text-muted-foreground">
          Aucun modèle ne correspond à votre recherche.
        </p>
      )}

      {groups.map((group) => (
        <section key={group.usage} className="flex flex-col gap-3">
          <h2 className="flex items-baseline gap-2 font-medium">
            {group.label}
            <span className="text-sm font-normal text-muted-foreground">
              {group.models.length}
            </span>
          </h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {group.models.map((model) => (
              <ModelCard key={model.id} model={model} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function ModelCard({ model }: { model: Model }) {
  const docUrl = model.docAnchor
    ? `${MODELS_DOC_URL}#${model.docAnchor}`
    : MODELS_DOC_URL;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="truncate font-mono text-sm">{model.id}</CardTitle>
        <CardDescription className="truncate" title={model.model}>
          {model.provider} · {model.model}
        </CardDescription>
        <CardAction>
          <CopyButton value={model.id} />
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3">
        <p className="text-muted-foreground">{model.description}</p>
        <div className="mt-auto flex flex-wrap gap-1.5">
          {model.testUntil && (
            <Badge className="bg-amber-500/15 text-amber-700 dark:text-amber-400">
              <FlaskConical data-icon="inline-start" />
              En test · jusqu'au {dateFormat.format(new Date(model.testUntil))}
            </Badge>
          )}
          {model.partner && (
            <Badge className="bg-blue-600/10 text-blue-700 dark:bg-blue-400/15 dark:text-blue-400">
              Partenaire
            </Badge>
          )}
          {model.vision && <Badge variant="secondary">Vision</Badge>}
          <Badge variant="outline">{model.license}</Badge>
        </div>
      </CardContent>
      <CardFooter className="justify-between gap-2 border-t bg-muted/50 py-3">
        <Button
          size="sm"
          variant="ghost"
          render={
            // biome-ignore lint/a11y/useAnchorContent: contenu fourni par Button
            <a href={docUrl} target="_blank" rel="noopener noreferrer" />
          }
          nativeButton={false}
        >
          Documentation
          <ExternalLink data-icon="inline-end" />
        </Button>
        {/* Le projet vient de l'URL : lu derrière Suspense pour que le reste
            de la page reste dans le shell statique, commun à tous les projets. */}
        <Suspense
          fallback={
            <Button size="sm" variant="outline" disabled>
              Essayer
            </Button>
          }
        >
          <TryInPlaygroundButton modelId={model.id} />
        </Suspense>
      </CardFooter>
    </Card>
  );
}

function TryInPlaygroundButton({ modelId }: { modelId: string }) {
  const { org, project } = useParams<{ org: string; project: string }>();

  return (
    <Button
      size="sm"
      variant="outline"
      render={
        <Link
          href={`/${org}/${project}/playground?model=${encodeURIComponent(modelId)}`}
        />
      }
      nativeButton={false}
    >
      Essayer
    </Button>
  );
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <Button
      size="icon-sm"
      variant="ghost"
      aria-label={copied ? "Identifiant copié" : "Copier l'identifiant"}
      onClick={async () => {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
    >
      {copied ? <Check /> : <Copy />}
    </Button>
  );
}
