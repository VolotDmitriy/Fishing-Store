import categories from '@/app/dashboard/categ.json';
import discounts from '@/app/dashboard/disc.json';
import products from '@/app/dashboard/prod.json';
import { AppSidebar } from '@/components/app-sidebar';
import { DataTable } from '@/components/data-table';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export default function Page() {
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
                <SiteHeader />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            <DataTable
                                categories={categories}
                                products={products}
                                discounts={discounts}
                            />
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
