'use client';

import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePathname, useRouter } from 'next/navigation';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const activeTab = pathname.split('/').pop() || 'categories';

    const handleTabChange = (value: string) => {
        router.push(`/dashboard/${value}`);
    };

    return (
        <SidebarProvider
            style={
                {
                    '--sidebar-width': 'calc(var(--spacing) * 72)',
                    '--header-height': 'calc(var(--spacing) * 12)',
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader title="Dashboard" />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            <Tabs
                                value={activeTab}
                                onValueChange={handleTabChange}
                                className="w-full"
                            >
                                <div className="flex items-center justify-between px-4 lg:px-6">
                                    <TabsList className="hidden @4xl/main:flex">
                                        <TabsTrigger value="categories">
                                            Categories
                                        </TabsTrigger>
                                        <TabsTrigger value="products">
                                            Products
                                        </TabsTrigger>
                                        <TabsTrigger value="discounts">
                                            Discounts
                                        </TabsTrigger>
                                    </TabsList>
                                </div>
                            </Tabs>
                            {children}
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
