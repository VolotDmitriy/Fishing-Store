import ItemSection from '@/components/app-components/item-section';
import ProductRecomend from '@/components/app-components/product-recomend';
import { getProduct } from '@/utils/requests';
import Footer from '../.././components/app-components/footer';
import Header from '../.././components/app-components/header';

export default async function ProductPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    try {
        const resolvedParams = await params;
        const product = await getProduct(resolvedParams.id);
        return (
            <div className="bg-[#141414]">
                <Header />
                <ItemSection id={product.id} />
                <ProductRecomend categoryId={product.categoryId} />
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
