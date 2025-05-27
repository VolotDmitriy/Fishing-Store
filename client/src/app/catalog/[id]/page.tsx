import { CatalogComponents } from '@/components/app-components/catalog-components';
import Footer from '@/components/app-components/footer';
import Header from '@/components/app-components/header';
import { PathBreadcrumb } from '@/components/path-breadcrumb';
import { slugify } from '@/utils/convert-cyrillic';
import { fetchCategories } from '@/utils/requests';
import { notFound } from 'next/navigation';

interface CatalogPageProps {
    params: Promise<{ id: string }>;
}

export default async function CatalogPageId({ params }: CatalogPageProps) {
    try {
        const { id } = await params;

        const categories = await fetchCategories(true);
        const category = categories.find((cat) => slugify(cat.name) === id);
        if (!category) {
            notFound();
        }
        return (
            <div className=" bg-[#141414]">
                <Header />
                <div className="ml-10 flex flex-col">
                    <PathBreadcrumb />
                    <CatalogComponents category={category} />
                </div>
                <Footer />
            </div>
        );
    } catch (error) {
        return (
            <div className="container mx-auto py-8 text-center">
                <h1 className="text-2xl font-bold text-red-600 mb-4">
                    Ошибка загрузки товара
                </h1>
                <p className="text-gray-600">{(error as Error).message}</p>
            </div>
        );
    }
}
