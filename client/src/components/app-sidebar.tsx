'use client';

import { NavDocuments } from '@/components/nav-documents';
import { NavMain } from '@/components/nav-main';
import { NavSecondary } from '@/components/nav-secondary';
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
    IconCategory,
    IconDashboard,
    IconDiscount,
    IconFish,
    IconPackage,
    IconPlus,
    IconShoppingCart,
} from '@tabler/icons-react';
import * as React from 'react';

const data = {
    user: {
        name: 'shadcn',
        email: 'm@example.com',
        avatar: '/avatars/shadcn.jpg',
    },
    navMain: [
        {
            title: 'Create',
            url: '/create',
            icon: IconPlus,
        },
        {
            title: 'Dashboard',
            url: '/dashboard',
            icon: IconDashboard,
        },
    ],
    navSecondary: [
        {
            title: 'Products',
            url: '/dashboard/products',
            icon: IconPackage,
        },
        {
            title: 'Categories',
            url: '/dashboard/categories',
            icon: IconCategory,
        },
        {
            title: 'Discounts',
            url: '/dashboard/discounts',
            icon: IconDiscount,
        },
    ],
    documents: [
        {
            name: 'Orders',
            url: '/orders',
            icon: IconShoppingCart,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5"
                        >
                            <a href="/create">
                                <IconFish className="!size-5" />
                                <span className="text-base font-semibold">
                                    Fishing Store Admin Panel
                                </span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavSecondary items={data.navSecondary} />
            </SidebarContent>
        </Sidebar>
    );
}
