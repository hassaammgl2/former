import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from "@/components/ui/button"
import { MOCK_FORMS } from '@/constants/MockData';
import {
    MoreHorizontal,
    Eye,
    BarChart2,
    Copy,
    Trash2,
    TrendingUp,
    FileText,
    Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export default function DashboardPage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500 ">

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <MetricCard label="Total Forms" value="12" icon={FileText} trend="+2 this month" />
                <MetricCard label="Total Submissions" value="1,284" icon={Users} trend="+12% from last week" />
                <MetricCard label="Avg. Conversion Rate" value="64.2%" icon={TrendingUp} trend="+3.1%" />
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">Recent Forms</h2>
                    <Button variant="ghost" size="sm">View all</Button>
                </div>
                <Card>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-zinc-100 bg-zinc-50/50">
                                    <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase">Form Name</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase">Status</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase">Submissions</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase">Created</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100">
                                {MOCK_FORMS.map((form) => (
                                    <tr key={form.id} className="hover:bg-zinc-50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-zinc-900">{form.title}</div>
                                            <div className="text-xs text-zinc-500 truncate max-w-[200px]">{form.description}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {/* <Badge variant={form.status === 'published' ? 'success' : 'outline'}> */}
                                            <Badge variant={'default'}>
                                                {form.status}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Users className="w-3 h-3 text-zinc-400" />
                                                <span className="text-sm font-medium">{form.submissionsCount}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-zinc-500">
                                            {new Date(form.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button variant="ghost" size="icon" ><Eye className="w-4 h-4" /></Button>
                                                <Button variant="ghost" size="icon"><BarChart2 className="w-4 h-4" /></Button>
                                                <Button variant="ghost" size="icon"><Copy className="w-4 h-4" /></Button>
                                                <Button variant="ghost" size="icon"><Trash2 className="w-4 h-4 text-red-400" /></Button>
                                            </div>
                                            <div className="group-hover:hidden"><MoreHorizontal className="w-4 h-4 ml-auto text-zinc-400" /></div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
};

const MetricCard = ({ label, value, icon: Icon, trend }: { label: string, value: string, trend: string, icon: LucideIcon }) => (
    <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-zinc-100 rounded-lg"><Icon className="w-5 h-5 text-zinc-600" /></div>
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{trend}</span>
        </div>
        <div className="space-y-1">
            <p className="text-sm font-medium text-zinc-500">{label}</p>
            <p className="text-3xl font-bold">{value}</p>
        </div>
    </Card>
);
