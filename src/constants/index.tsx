import {
    LayoutDashboard,
    FileText,
    Database,
    Zap,
    Settings,
} from 'lucide-react';



export const links = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: <LayoutDashboard className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
        label: "Forms",
        href: "/forms",
        icon: (
            <FileText className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
        ),
    },
    {
        label: "Submissions",
        href: "/submissions",
        icon: (
            <Database className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
        ),
    },
    {
        label: "Integrations",
        href: "/integrations",
        icon: (
            <Zap className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
        ),
    },
    {
        label: "Settings",
        href: "/settings",
        icon: (
            <Settings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
        ),
    },
];