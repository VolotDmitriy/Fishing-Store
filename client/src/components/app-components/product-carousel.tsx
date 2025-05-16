import React from 'react';
import ProductCard from '../product-card';
import UniversalCarousel from '../universal-carousel';

interface Product {
    id: string;
    name: string;
    imageSrc: string;
    price: number;
    sizes: string[];
    weights: string[];
}

const products: Product[] = [
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
];

const ProductCarousel: React.FC = () => {
    return (
        <div className="w-full flex justify-center bg-[#242424]">
            <div
                className={
                    'w-full max-w-[1760px] flex flex-col items-center justify-center px-[20px]'
                }
            >
                <h2
                    className={
                        'font-brigend text-[44px] leading-[1] font-bold pt-[82px]'
                    }
                >
                    TOP PRODUCTS
                </h2>

                <UniversalCarousel itemsPerView={4}>
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            imageSrc={product.imageSrc}
                            title={product.name}
                            price={product.price}
                            sizes={product.sizes}
                            weights={product.weights}
                        />
                    ))}
                </UniversalCarousel>
            </div>
        </div>
    );
};

export default ProductCarousel;
