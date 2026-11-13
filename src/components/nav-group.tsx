"use client";

import { ArrowUpRight, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export type NavItem = { title: string; url: string; icon: LucideIcon };
export type NavSection = { label?: string; items: NavItem[] };

type NavGroupProps = {
  section: NavSection;
  baseUrl?: string;
  className?: string;
};

/**
 * Groupe de liens de la sidebar.
 * `baseUrl` est préfixé à chaque `item.url` (ex. /[org]/[project]).
 * Un `item.url` vide pointe sur `baseUrl` lui-même et n'est actif que sur cette page exacte.
 * Un `item.url` absolu (http…) est un lien externe, ouvert dans un nouvel onglet.
 *
 * Avec Cache Components, `usePathname` suspend sur les routes à paramètres
 * dynamiques : on affiche donc les liens sans état actif en attendant.
 */
export function NavGroup(props: NavGroupProps) {
  return (
    <Suspense fallback={<NavGroupView {...props} pathname={null} />}>
      <NavGroupWithPathname {...props} />
    </Suspense>
  );
}

function NavGroupWithPathname(props: NavGroupProps) {
  const pathname = usePathname();
  return <NavGroupView {...props} pathname={pathname} />;
}

function NavGroupView({
  section,
  baseUrl = "",
  className,
  pathname,
}: NavGroupProps & { pathname: string | null }) {
  return (
    <SidebarGroup className={className}>
      {section.label && <SidebarGroupLabel>{section.label}</SidebarGroupLabel>}
      <SidebarGroupContent>
        <SidebarMenu>
          {section.items.map((item) => {
            const isExternal = /^https?:\/\//.test(item.url);
            const href = isExternal ? item.url : `${baseUrl}${item.url}`;
            const isActive =
              !isExternal &&
              pathname !== null &&
              (item.url === ""
                ? pathname === href
                : pathname === href || pathname.startsWith(`${href}/`));

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  render={
                    isExternal ? (
                      // biome-ignore lint/a11y/useAnchorContent: contenu fourni par SidebarMenuButton
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                    ) : (
                      <Link href={href} />
                    )
                  }
                  isActive={isActive}
                  tooltip={item.title}
                >
                  <item.icon />
                  <span>{item.title}</span>
                  {isExternal && (
                    <ArrowUpRight className="ml-auto text-sidebar-foreground/50" />
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
