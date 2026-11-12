"use client";

import {
  ArrowLeft,
  Building,
  LayoutDashboard,
  Route,
  Server,
  Shield,
  Users,
} from "lucide-react";
import Link from "next/link";
import { helpSection } from "@/components/help-nav";
import { NavGroup, type NavSection } from "@/components/nav-group";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { CurrentUser } from "@/lib/session";

// Chemins relatifs à /admin
const adminSections: NavSection[] = [
  {
    label: "Général",
    items: [{ title: "Vue d'ensemble", url: "", icon: LayoutDashboard }],
  },
  {
    label: "Plateforme",
    items: [
      { title: "Organisations", url: "/organizations", icon: Building },
      { title: "Utilisateurs", url: "/users", icon: Users },
    ],
  },
  {
    label: "Infrastructure",
    items: [
      { title: "Routeurs", url: "/routers", icon: Route },
      { title: "Fournisseurs", url: "/providers", icon: Server },
    ],
  },
];

export function AdminSidebar({ user }: { user: CurrentUser }) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              render={<Link href="/admin" />}
              tooltip="Espace Administrateur"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-600 text-white dark:bg-blue-500">
                <Shield className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  Espace Administrateur
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {adminSections.map((section) => (
          <NavGroup key={section.label} section={section} baseUrl="/admin" />
        ))}
        <NavGroup section={helpSection} className="mt-auto" />
        <SidebarGroup className="pt-0">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                render={<Link href="/" />}
                tooltip="Retour à la console"
                className="text-blue-600 hover:bg-blue-600/10 hover:text-blue-600 active:bg-blue-600/10 active:text-blue-600 dark:text-blue-400 dark:hover:bg-blue-400/20 dark:hover:text-blue-400"
              >
                <ArrowLeft />
                <span>Retour à la console</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
