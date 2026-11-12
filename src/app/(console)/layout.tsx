import { AppShell } from "@/components/app-shell";
import { AppSidebar } from "@/components/app-sidebar";
import { getCurrentOrganization, getCurrentUser } from "@/lib/session";

export default function ConsoleLayout({ children }: LayoutProps<"/">) {
  const user = getCurrentUser();
  const organization = getCurrentOrganization();

  return (
    <AppShell sidebar={<AppSidebar user={user} organization={organization} />}>
      {children}
    </AppShell>
  );
}
