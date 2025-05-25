import ItemSection from '@/components/app-components/item-section';
import ProductRecomend from '@/components/app-components/product-recomend';
import { productSchema, ProductType } from '@/components/data-table/types';
import Footer from '../.././components/app-components/footer';
import Header from '../.././components/app-components/header';

async function getProduct(id: string): Promise<ProductType> {
    if (!id) throw new Error('Product ID is required');

    const res = await fetch(`http://localhost:4200/product/${id}?full=true`, {
        cache: 'no-store', // Отключаем кэширование для динамических данных
    });
    if (!res.ok) throw new Error('Failed to fetch product');

    const data = await res.json();
    return productSchema.parse(data);
}

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
