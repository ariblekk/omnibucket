"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  IconApi,
  IconChartPie,
  IconCloud,
  IconCloudComputing,
  IconFileStack,
  IconHistory,
  IconLogout,
  IconSettings,
} from "@tabler/icons-react";

import packageJson from "@/package.json";

import { SidebarStorage } from "@/components/gateway/sidebar-storage";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  navMain: [
    {
      title: "Overview",
      url: "/dashboard",
      icon: IconChartPie,
    },
    {
      title: "Object Storage",
      url: "/dashboard/object-storage",
      icon: IconFileStack,
    },
    {
      title: "Accounts & Quota",
      url: "/dashboard/accounts",
      icon: IconCloud,
    },
    {
      title: "Activity Log",
      url: "/dashboard/activity",
      icon: IconHistory,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: IconSettings,
    },
    {
      title: "API Docs (Swagger)",
      url: "/docs",
      icon: IconApi,
      target: "_blank",
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    toast.success("Signed out");
    router.replace("/login");
    router.refresh();
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5! group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2!"
            >
              <Link href="/dashboard">
                <IconCloudComputing className="size-5!" />
                <span className="text-base font-semibold group-data-[collapsible=icon]:hidden">
                  Omnibucket
                </span>
                <span className="text-[10px] text-muted-foreground group-data-[collapsible=icon]:hidden">
                  v{packageJson.version}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <div className="mt-auto group-data-[collapsible=icon]:hidden">
          <SidebarStorage />
        </div>
        <NavSecondary items={data.navSecondary} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => void handleLogout()}
              tooltip="Log out"
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            >
              <IconLogout />
              <span>Log out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
