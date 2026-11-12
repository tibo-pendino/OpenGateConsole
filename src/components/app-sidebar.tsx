"use client";

import {
  Boxes,
  ChartColumn,
  Check,
  ChevronsUpDown,
  Contact,
  Files,
  FlaskConical,
  FolderKanban,
  Gauge,
  KeyRound,
  LayoutDashboard,
  Library,
  Network,
  Plus,
  Shield,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { helpSection } from "@/components/help-nav";
import {
  NavGroup,
  type NavItem,
  type NavSection,
} from "@/components/nav-group";
import { NavUser } from "@/components/nav-user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuLinkItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import type { CurrentUser, Organization } from "@/lib/session";

// Chemins relatifs au projet sélectionné : /[org]/[project]<url>
const projectSections: NavSection[] = [
  {
    label: "Général",
    items: [{ title: "Tableau de bord", url: "", icon: LayoutDashboard }],
  },
  {
    label: "Exploration",
    items: [
      { title: "Modèles", url: "/models", icon: Boxes },
      { title: "Bac à sable", url: "/playground", icon: FlaskConical },
    ],
  },
  {
    label: "Connaissances",
    items: [
      { title: "Collections", url: "/collections", icon: Library },
      { title: "Documents", url: "/documents", icon: Files },
    ],
  },
  {
    label: "Développement",
    items: [
      { title: "Clés d'API", url: "/keys", icon: KeyRound },
      { title: "Consommation", url: "/usage", icon: ChartColumn },
      { title: "Limites", url: "/limits", icon: Gauge },
    ],
  },
];

// Chemins relatifs à l'organisation : /[org]/settings<url>
const organizationNav: NavItem[] = [
  { title: "Membres", url: "/members", icon: Contact },
  { title: "Équipes", url: "/teams", icon: UsersRound },
  { title: "Projets", url: "/projects", icon: FolderKanban },
];

/** Déduit le projet courant et la sous-page depuis l'URL /[org]/[project]/... */
function useCurrentProject(organization: Organization) {
  const pathname = usePathname();
  const projects = organization.teams.flatMap((team) => team.projects);
  const [orgSlug, projectSlug, ...rest] = pathname.split("/").filter(Boolean);
  const fromUrl =
    orgSlug === organization.slug
      ? projects.find((project) => project.slug === projectSlug)
      : undefined;

  return {
    project: fromUrl ?? projects[0],
    // Sous-page conservée quand on change de projet (ex. /usage)
    subPath: fromUrl && rest.length > 0 ? `/${rest.join("/")}` : "",
  };
}

function ProjectSwitcher({ organization }: { organization: Organization }) {
  const { isMobile } = useSidebar();
  const { project, subPath } = useCurrentProject(organization);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className="data-popup-open:bg-sidebar-accent data-popup-open:text-sidebar-accent-foreground"
              />
            }
          >
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <Network className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate text-xs text-sidebar-foreground/70">
                {organization.name}
              </span>
              <span className="truncate font-medium">{project.name}</span>
            </div>
            <ChevronsUpDown className="ml-auto" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="min-w-64"
            side={isMobile ? "bottom" : "right"}
          >
            {organization.teams.map((team) => (
              <DropdownMenuGroup key={team.name}>
                <DropdownMenuLabel>{team.name}</DropdownMenuLabel>
                {team.projects.map((p) => (
                  <DropdownMenuLinkItem
                    key={p.slug}
                    render={
                      <Link
                        href={`/${organization.slug}/${p.slug}${subPath}`}
                      />
                    }
                  >
                    <FolderKanban />
                    {p.name}
                    {p.slug === project.slug && <Check className="ml-auto" />}
                  </DropdownMenuLinkItem>
                ))}
                {team.projects.length === 0 && (
                  <DropdownMenuItem disabled>Aucun projet</DropdownMenuItem>
                )}
              </DropdownMenuGroup>
            ))}
            <DropdownMenuItem>
              <Plus />
              Nouveau projet
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel>{organization.name}</DropdownMenuLabel>
              {organizationNav.map((item) => (
                <DropdownMenuLinkItem
                  key={item.title}
                  render={
                    <Link href={`/${organization.slug}/settings${item.url}`} />
                  }
                >
                  <item.icon />
                  {item.title}
                </DropdownMenuLinkItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

function ProjectNav({ organization }: { organization: Organization }) {
  const { project } = useCurrentProject(organization);
  const projectBaseUrl = `/${organization.slug}/${project.slug}`;

  return projectSections.map((section) => (
    <NavGroup key={section.label} section={section} baseUrl={projectBaseUrl} />
  ));
}

// Affichés pendant que le projet courant (lu dans l'URL) est résolu.
function ProjectSwitcherSkeleton() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex h-12 items-center gap-2 px-2">
          <Skeleton className="size-8 rounded-lg" />
          <Skeleton className="h-4 flex-1" />
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

function ProjectNavSkeleton() {
  return projectSections.map((section) => (
    <SidebarGroup key={section.label}>
      <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
      <SidebarMenu>
        {section.items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <div className="flex h-8 items-center gap-2 px-2">
              <Skeleton className="size-4 rounded-md" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  ));
}

export function AppSidebar({
  user,
  organization,
}: {
  user: CurrentUser;
  organization: Organization;
}) {
  // Le projet courant vient de l'URL : avec Cache Components, usePathname
  // suspend sur les routes dynamiques, d'où les Suspense ci-dessous.
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Suspense fallback={<ProjectSwitcherSkeleton />}>
          <ProjectSwitcher organization={organization} />
        </Suspense>
      </SidebarHeader>

      <SidebarContent>
        <Suspense fallback={<ProjectNavSkeleton />}>
          <ProjectNav organization={organization} />
        </Suspense>
        <NavGroup section={helpSection} className="mt-auto" />
        {user.isPlatformAdmin && (
          <SidebarGroup className="pt-0">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link href="/admin" />}
                  tooltip="Espace Administrateur"
                  className="text-blue-600 hover:bg-blue-600/10 hover:text-blue-600 active:bg-blue-600/10 active:text-blue-600 dark:text-blue-400 dark:hover:bg-blue-400/20 dark:hover:text-blue-400"
                >
                  <Shield />
                  <span>Espace Administrateur</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
