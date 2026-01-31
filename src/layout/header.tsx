"use client"
import Logo from '@/components/custom/logo';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useSession } from "@/services/better-auth/auth-client"

const Header = () => {
    const router = useRouter()
    const {
        data: session,
        isPending,
    } = useSession()

    return (
        <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-zinc-100 z-50 ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between ">
                <Logo />
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
                    <a href="#features" className="hover:text-zinc-900 transition-colors">Features</a>
                    <a href="#pricing" className="hover:text-zinc-900 transition-colors">Pricing</a>
                    <a href="#docs" className="hover:text-zinc-900 transition-colors">Docs</a>
                </div>
                <div className="flex items-center gap-4">
                    {isPending && "Loading..."}
                    {!session?.user ? <>
                        <Button variant="ghost" size="sm" onClick={() => router.push("/sign-in")}>Log in</Button>
                        <Button size="sm" onClick={() => router.push("/sign-up")}>Get Started</Button>
                    </>
                        : <Button size="sm" onClick={() => router.push("/dashboard")}>Dashboard</Button>}
                </div>
            </div>
        </nav>
    )
}

export default Header