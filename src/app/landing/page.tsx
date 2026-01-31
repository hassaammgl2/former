"use client"
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import Header from '@/layout/header';
import Footer from '@/layout/fotter';
import {
    CheckCircle,
    Users,
    ShieldCheck,
    ArrowRight,
    ChevronRight,
    Layout,
    GitBranch,
    BarChart3,
    Workflow,
    LucideIcon
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const LandingPage = () => {
    const router = useRouter()

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <Header />

            {/* Hero */}
            <section className="pt-32 pb-20 px-4">
                <div className="max-w-5xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-600 text-xs font-semibold mb-4">
                        <Badge>New</Badge>
                        <span>v2.0 is now live with conditional logic</span>
                        <ChevronRight className="w-3 h-3" />
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-zinc-900 leading-tight">
                        Build beautiful forms <br />
                        <span className="text-zinc-400">without the headache.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto">
                        The professional drag-and-drop form builder for modern teams.
                        Gather insights, automate workflows, and integrate with your favorite tools.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button size="lg" className="w-full sm:w-auto" onClick={() => router.push("/sign-in")}>
                            Create your first form <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                        <Button variant="outline" size="lg" className="w-full sm:w-auto">
                            View Demo
                        </Button>
                    </div>
                    <div className="pt-12">
                        <div className="relative mx-auto max-w-4xl rounded-xl border border-zinc-200 bg-zinc-50 p-2 shadow-2xl">
                            <div className="rounded-lg bg-white overflow-hidden border border-zinc-200 aspect-video flex items-center justify-center text-zinc-400 italic">
                                <Image src={"/hero2.png"} width={100} height={100} alt="App Preview" className="w-full h-full object-cover opacity-80" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section id="features" className="py-24 bg-zinc-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-sm font-semibold text-zinc-600 uppercase tracking-widest">Capabilities</h2>
                        <p className="text-3xl font-bold">Everything you need to gather data.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={Layout}
                            title="Drag & Drop Builder"
                            desc="Intuitive interface to build complex forms in minutes. Reorder, group, and customize fields effortlessly."
                        />
                        <FeatureCard
                            icon={GitBranch}
                            title="Conditional Logic"
                            desc="Create personalized experiences by showing or hiding fields based on user responses."
                        />
                        <FeatureCard
                            icon={BarChart3}
                            title="Rich Analytics"
                            desc="Understand your data with real-time conversion rates, drop-off tracking, and sentiment analysis."
                        />
                        <FeatureCard
                            icon={Workflow}
                            title="Smart Integrations"
                            desc="Connect seamlessly with Slack, Notion, Zapier, and more. Send your data wherever it's needed."
                        />
                        <FeatureCard
                            icon={ShieldCheck}
                            title="Enterprise Security"
                            desc="GDPR compliant, SOC2 ready. Your data and your users' data are encrypted at rest and in transit."
                        />
                        <FeatureCard
                            icon={Users}
                            title="Team Collaboration"
                            desc="Work together on forms with role-based permissions, version history, and shared folders."
                        />
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold">Simple, transparent pricing.</h2>
                        <p className="text-zinc-500 mt-2">Start for free, upgrade as you grow.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <PricingCard title="Starter" price="0" features={["10 Forms", "100 Submissions/mo", "Basic Fields"]} />
                        <PricingCard title="Pro" price="29" featured features={["Unlimited Forms", "5k Submissions/mo", "Conditional Logic", "Custom Branding"]} />
                        <PricingCard title="Business" price="99" features={["Unlimited Everything", "API Access", "SSO & SAML", "Priority Support"]} />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

const FeatureCard = ({ icon: Icon, title, desc }: { icon: LucideIcon, title: string, desc: string }) => (
    <Card className="p-8 hover:border-zinc-300 transition-all duration-300 group">
        <div className="w-12 h-12 bg-zinc-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-zinc-900 transition-colors">
            <Icon className="w-6 h-6 text-zinc-900 group-hover:text-white transition-colors" />
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-zinc-500 leading-relaxed text-sm">{desc}</p>
    </Card>
);

const PricingCard = ({ title, price, featured, features }: { title: string, price: string, features: string[], featured?: boolean }) => (
    <Card className={`p-8 flex flex-col relative ${featured ? 'border-zinc-900 ring-1 ring-zinc-900' : ''}`}>
        {featured && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-zinc-900 text-white px-3 py-1 rounded-full text-xs font-bold">Most Popular</span>}
        <div className="mb-8">
            <h3 className="text-lg font-semibold">{title}</h3>
            <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-extrabold tracking-tight">${price}</span>
                <span className="ml-1 text-zinc-500">/month</span>
            </div>
        </div>
        <ul className="space-y-4 mb-8 grow">
            {features.map((f: string, i: number) => (
                <li key={i} className="flex items-center gap-3 text-sm text-zinc-600">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    {f}
                </li>
            ))}
        </ul>
        <Button variant={featured ? 'default' : 'outline'} className="w-full">Get Started</Button>
    </Card>
);


export default LandingPage;
