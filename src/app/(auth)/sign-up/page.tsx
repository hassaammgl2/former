"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/services/better-auth/auth-client";

import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Logo from "@/components/custom/logo";
import Link from "next/link";

export default function SignUpPage() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);

        const formData = new FormData(e.currentTarget);

        const res = await signUp.email({
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            password: formData.get("password") as string,
        });

        if (res.error) {
            setError(res.error.message || "Something went wrong.");
        } else {
            router.push("/dashboard");
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-zinc-50 p-4">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center space-y-2">
                    <div className="flex justify-center mb-6">
                        <Logo />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Create an account
                    </h1>
                    <p className="text-zinc-500 text-sm">
                        Get started with our free trial today
                    </p>
                </div>
                <form onSubmit={handleSubmit}>
                    <Card className="p-8 space-y-6">
                        {error && <p className="text-red-500">{error}</p>}
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-medium">Username  *</label>
                                </div>
                                <Input name="name"
                                    placeholder="Full Name"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-medium">Email *</label>
                                </div>
                                <Input
                                    type="email"
                                    placeholder="name@company.com"
                                    name="email"
                                    required
                                />
                            </div>


                            <div className="space-y-1">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-medium">Password *</label>
                                </div>
                                <Input type="password" name="password"
                                    placeholder="Password"
                                    required
                                    minLength={8}
                                />
                            </div>
                            <Button type="submit" className="w-full" >
                                Create Account
                            </Button>
                        </div>

                        <p className="text-xs text-center text-zinc-500 leading-relaxed px-4">
                            By clicking continue, you agree to our{" "}
                            <span className="underline cursor-pointer">Terms of Service</span>{" "}
                            and <span className="underline cursor-pointer">Privacy Policy</span>
                            .
                        </p>
                    </Card>

                </form>
                <p className="text-center text-sm text-zinc-500">
                    Already have an account?{" "}
                    <Link href={"/sign-in"} >
                        <button
                            className="font-semibold text-zinc-900 hover:underline"
                        >
                            Log in
                        </button>
                    </Link>
                </p>
            </div>
        </main>

    );
}