import { AppLayout } from "@/layout/AppLayout";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider>
            <AppLayout>
                {children}
            </AppLayout>
        </SidebarProvider>
    );
}

