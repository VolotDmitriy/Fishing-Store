import { ProductType } from '@/components/data-table/types';
import axios from 'axios';
import ProductCard from '../product-card';
import UniversalCarousel from '../universal-carousel';

interface ItemSectionProps {
    categoryId: string;
}
interface Product {
    id: string;
    name: string;
    imageSrc: string;
    price: number;
    sizes: string[];
    weights: string[];
}

async function getRecommendedProduct(
    categoryId: string,
): Promise<ProductType[]> {
    if (!categoryId) throw new Error('Category ID is required');
    const res = await axios.get(
        `http://localhost:4200/product/category/${categoryId}?full=true`,
    );
    if (!(res.status === 200)) throw new Error('Failed to fetch category');

    const data = res.data;
    return data;
}

async function ProductRecomend({ categoryId }: ItemSectionProps) {
    try {
        const recomProducts = await getRecommendedProduct(categoryId);
        return (
            <div className="w-full flex justify-center mb-[50px]">
                <div
                    className={
                        'w-full max-w-[2120px] flex flex-col items-center justify-center px-[20px]'
                    }
                >
                    <h2
                        className={
                            'w-full justify-start font-brigend text-[32px] leading-[1] font-bold px-[80px] pt-[60px]'
                        }
                    >
                        RECOMMENDED FOR YOU
                    </h2>

                    <UniversalCarousel itemsPerView={4}>
                        {recomProducts.map((product: ProductType) => (
                            <ProductCard key={product.id} item={product} />
                        ))}
                    </UniversalCarousel>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Error loading recommended products:', error);
        return null;
    }
}

export default ProductRecomend;
