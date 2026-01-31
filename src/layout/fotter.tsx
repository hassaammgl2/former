import Logo from "@/components/custom/logo";

const fotter = () => {
    return (
        <footer className="bg-zinc-900 text-zinc-400 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between gap-8">
                <div className="space-y-4">
                    {/* Logo here */}
                    <Logo isheader={false} />
                    <p className="max-w-xs text-sm">Empowering teams to gather better insights through beautiful, conversion-optimized forms.</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                    <FooterLinkGroup title="Product" links={["Features", "Integrations", "Pricing", "Changelog"]} />
                    <FooterLinkGroup title="Company" links={["About", "Blog", "Careers", "Contact"]} />
                    <FooterLinkGroup title="Legal" links={["Privacy", "Terms", "Security"]} />
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-zinc-800 text-sm flex flex-col sm:flex-row justify-between gap-4">
                <p>© 2024 FormFlow Pro Inc. All rights reserved.</p>
                <div className="flex gap-4">
                    <span className="hover:text-white cursor-pointer transition-colors">Twitter</span>
                    <span className="hover:text-white cursor-pointer transition-colors">LinkedIn</span>
                    <span className="hover:text-white cursor-pointer transition-colors">GitHub</span>
                </div>
            </div>
        </footer>
    )
}

export default fotter


const FooterLinkGroup = ({ title, links }: { title: string, links: string[] }) => (
    <div className="space-y-4">
        <h4 className="text-white font-semibold text-sm">{title}</h4>
        <ul className="space-y-2 text-sm">
            {links.map((link: string) => <li key={link} className="hover:text-white cursor-pointer transition-colors">{link}</li>)}
        </ul>
    </div>
);