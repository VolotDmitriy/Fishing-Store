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

const productsTest: Product[] = [
    {
        id: 'prod001',
        name: 'Бойли розчинні SquidBerry',
        imageSrc: 'Products/1.jpg',
        price: 405,
        sizes: ['20 мм', '24 мм'],
        weights: ['zip-уп 1 кг', 'відро 3 кг'],
    },
    {
        id: 'prod002',
        name: 'Бойли Krill Fusion',
        imageSrc: 'Products/2.jpg',
        price: 379,
        sizes: ['16 мм', '20 мм'],
        weights: ['zip-уп 0.5 кг', 'відро 2 кг'],
    },
    {
        id: 'prod003',
        name: 'Pop-ups Ananas',
        imageSrc: 'Products/3.jpg',
        price: 189,
        sizes: ['10 мм', '14 мм'],
        weights: ['банка 100г'],
    },
    {
        id: 'prod004',
        name: 'Крючки RB-28419',
        imageSrc: 'Products/4.jpg',
        price: 129,
        sizes: ['M', 'L'],
        weights: ['упаковка 10 шт'],
    },
    {
        id: 'prod005',
        name: 'Бойли розчинні SquidBerry',
        imageSrc: 'Products/1.jpg',
        price: 405,
        sizes: ['20 мм', '24 мм'],
        weights: ['zip-уп 1 кг', 'відро 3 кг'],
    },
    {
        id: 'prod006',
        name: 'Бойли Krill Fusion',
        imageSrc: 'Products/2.jpg',
        price: 379,
        sizes: ['16 мм', '20 мм'],
        weights: ['zip-уп 0.5 кг', 'відро 2 кг'],
    },
    {
        id: 'prod007',
        name: 'Pop-ups Ananas',
        imageSrc: 'Products/3.jpg',
        price: 189,
        sizes: ['10 мм', '14 мм'],
        weights: ['банка 100г'],
    },
    {
        id: 'prod008',
        name: 'Крючки RB-28419',
        imageSrc: 'Products/4.jpg',
        price: 129,
        sizes: ['M', 'L'],
        weights: ['упаковка 10 шт'],
    },
    {
        id: 'prod009',
        name: 'Бойли розчинні SquidBerry',
        imageSrc: 'Products/1.jpg',
        price: 405,
        sizes: ['20 мм', '24 мм'],
        weights: ['zip-уп 1 кг', 'відро 3 кг'],
    },
    {
        id: 'prod010',
        name: 'Бойли Krill Fusion',
        imageSrc: 'Products/2.jpg',
        price: 379,
        sizes: ['16 мм', '20 мм'],
        weights: ['zip-уп 0.5 кг', 'відро 2 кг'],
    },
];

async function getRecommendedProduct(
    categoryId: string,
): Promise<ProductType[]> {
    if (!categoryId) throw new Error('Category ID is required');
    const res = await axios.get(
        `http://localhost:4200/product/category/${categoryId}?full=true`,
    );
    console.log('12312312312312312312');
    console.log(res.data);
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

                    <UniversalCarousel itemsPerView={5}>
                        {recomProducts.map((product: ProductType, index) => (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                imageSrc={productsTest[index].imageSrc}
                                title={product.name}
                                price={productsTest[index].price}
                                sizes={productsTest[index].sizes}
                                weights={productsTest[index].weights}
                            />
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
