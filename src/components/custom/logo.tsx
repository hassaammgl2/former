"use client"
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const Logo = ({ isheader = true, className = "" }) => {
    return (
        <Link href="/">
            <div className="flex items-center gap-4 mb-2">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                    <Image src={"/logo.png"} height={20} width={20} alt='logo' />
                </div>
                <span className={cn("text-xl font-bold", (isheader ? "text-zinc-800" : "text-white/80") + className)}>Former</span>
            </div>
        </Link>
    )
}

export default Logo