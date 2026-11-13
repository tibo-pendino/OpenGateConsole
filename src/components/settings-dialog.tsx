"use client";

import { cn } from "cn";
import {
  Bell,
  Building,
  Lock,
  type LucideIcon,
  SlidersHorizontal,
  UserRound,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

export type SettingsSection =
  | "profile"
  | "organization"
  | "security"
  | "preferences"
  | "notifications";

type SectionItem = { id: SettingsSection; title: string; icon: LucideIcon };

const sectionGroups: { label: string; items: SectionItem[] }[] = [
  {
    label: "Compte",
    items: [
      { id: "profile", title: "Profil", icon: UserRound },
      { id: "organization", title: "Organisation", icon: Building },
      { id: "security", title: "Sécurité", icon: Lock },
    ],
  },
  {
    label: "Paramètres",
    items: [
      { id: "preferences", title: "Préférences", icon: SlidersHorizontal },
      { id: "notifications", title: "Notifications", icon: Bell },
    ],
  },
];

const sectionTitles = Object.fromEntries(
  sectionGroups.flatMap((g) => g.items.map((i) => [i.id, i.title])),
) as Record<SettingsSection, string>;

/**
 * Modale « Mon compte / Paramètres ». La section affichée est contrôlée par
 * le parent : null = fermée.
 */
export function SettingsDialog({
  section,
  onSectionChange,
}: {
  section: SettingsSection | null;
  onSectionChange: (section: SettingsSection | null) => void;
}) {
  return (
    <Dialog
      open={section !== null}
      onOpenChange={(open) => {
        if (!open) onSectionChange(null);
      }}
    >
      <DialogContent className="flex h-[min(600px,85vh)] flex-col gap-0 overflow-hidden p-0 sm:max-w-3xl md:flex-row">
        <nav className="flex shrink-0 gap-4 overflow-x-auto border-b bg-sidebar p-2 pr-10 md:w-52 md:pr-2 md:flex-col md:overflow-x-visible md:border-r md:border-b-0">
          {sectionGroups.map((group) => (
            <div key={group.label} className="flex gap-1 md:flex-col">
              <span className="hidden px-2 pt-2 pb-1 text-xs font-medium text-sidebar-foreground/70 md:block">
                {group.label}
              </span>
              {group.items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSectionChange(item.id)}
                  aria-current={section === item.id ? "page" : undefined}
                  className={cn(
                    "flex h-8 shrink-0 items-center gap-2 rounded-md px-2 text-sm text-sidebar-foreground outline-none hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring [&_svg]:size-4 [&_svg]:shrink-0",
                    section === item.id &&
                      "bg-sidebar-accent font-medium text-sidebar-accent-foreground",
                  )}
                >
                  <item.icon />
                  {item.title}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-6">
          <DialogTitle className="text-lg">
            {section ? sectionTitles[section] : ""}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Gérer votre compte et vos paramètres.
          </DialogDescription>
          {/* Contenu provisoire */}
          <div className="h-24 rounded-xl bg-muted/50" />
          <div className="min-h-40 flex-1 rounded-xl bg-muted/50" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
