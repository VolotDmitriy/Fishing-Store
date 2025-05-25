'use client';

import { Filter } from '@/components/app-components/filter';
import Footer from '@/components/app-components/footer';
import Header from '@/components/app-components/header';
import { PathBreadcrumb } from '@/components/path-breadcrumb';

export default function CatalogPage() {
    return (
        <div className=" bg-[#141414]">
            <Header />
            <div className="ml-10 flex flex-col">
                <PathBreadcrumb />
                <Filter className="w-[290px]" />
            </div>

            <Footer />
        </div>
    );
}
