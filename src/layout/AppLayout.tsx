"use client";
import { LogOut, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { links } from "@/constants";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession, signOut } from "@/services/better-auth/auth-client";
import { useRouter } from "next/navigation";
import Logo from "@/components/custom/logo";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const AppLayout = ({ children }: { children?: React.ReactNode }) => {
  const router = useRouter();
  const { data, error } = useSession();
  const onLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  };
  if (error) {
    router.push("/sign-in");
  }
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Sidebar */}
      <Sidebar>
        <SidebarHeader className="flex justify-center">
          <Logo className="font-extrabold text-black/75 text-4xl" />
        </SidebarHeader>
        <SidebarContent className="justify-between gap-10">
          <SidebarMenu className="mt-8 flex flex-col gap-2 px-4">
            {links.map((link, idx) => (
              <Link key={idx} href={link.href}>
                <SidebarMenuItem className="flex justify-items-start gap-4 items-center">
                  {link.icon}
                  <span className="font-bold">{link.label}</span>
                </SidebarMenuItem>
              </Link>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <Link href={"/profile"}>
            <SidebarMenuItem className="mt-auto p-4 border-t border-zinc-100 flex gap-4">
              <Avatar className="w-8 h-8 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center overflow-hidden">
                <AvatarImage src={data?.user.image as string} />
                <AvatarFallback className="text-black/70 text-2xl">
                  {data?.user.name.substring(0, 1)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold truncate">
                  {data?.user.name as string}
                </p>
                <p className="text-[10px] text-zinc-500 truncate capitalize">
                  {data?.user.email as string}
                </p>
              </div>
            </SidebarMenuItem>
          </Link>
          <SidebarMenuItem>
            <Button
              variant={"destructive"}
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-white hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </Button>
          </SidebarMenuItem>
        </SidebarFooter>
      </Sidebar>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-scroll">
        <TopBar />
        <div className="mx-auto w-full">{children}</div>
      </main>
    </div>
  );
};

interface TopBarDataI {
  title: string;
  desc: string;
}

const metaData = {
  dashboard: {
    title: "Dashboard",
    desc: "Overview of your forms and submissions",
  },
  forms: {
    title: "Forms",
    desc: "Create and manage your forms",
  },
  submissons: {
    title: "Submissions",
    desc: "View and manage form submissions",
  },
  integrations: {
    title: "Integrations",
    desc: "Connect your forms to external services",
  },
  profile: {
    title: "Profile",
    desc: "Manage and edit your profile",
  },
  settings: {
    title: "Settings",
    desc: "Manage your account and preferences",
  },
};

const TopBar = () => {
  const TOPBAR_MAP: Record<string, TopBarDataI> = {
    "/dashboard": metaData.dashboard,
    "/forms": metaData.forms,
    "/submissions": metaData.submissons,
    "/integrations": metaData.integrations,
    "/profile": metaData.profile,
    "/settings": metaData.settings,
  };

  const path = usePathname();
  const topbarData = TOPBAR_MAP[path] ?? metaData.dashboard;

  return (
    <div className="flex items-center justify-between px-4 mt-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          <SidebarTrigger /> {topbarData.title}
        </h1>
        <p className="text-muted-foreground mt-1">{topbarData.desc}</p>
      </div>
      <Button asChild>
        <Link href="/builder">
          <Plus className="h-4 w-4 mr-2" />
          Create form
        </Link>
      </Button>
    </div>
  );
};
