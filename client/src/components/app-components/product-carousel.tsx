import React from 'react';
import ProductCard from '../product-card';
import UniversalCarousel from '../universal-carousel';

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
                    <ProductCard
                        imageSrc="Products/1.jpg"
                        title="Бойли розчинні SquidBerry"
                        price={405}
                        sizes={['20 мм', '24 мм']}
                        weights={['zip-уп 1 кг', 'відро 3 кг']}
                    />
                    <ProductCard
                        imageSrc="Products/2.jpg"
                        title="Бойли Krill Fusion"
                        price={379}
                        sizes={['16 мм', '20 мм']}
                        weights={['zip-уп 0.5 кг', 'відро 2 кг']}
                    />
                    <ProductCard
                        imageSrc="Products/3.jpg"
                        title="Pop-ups Ananas"
                        price={189}
                        sizes={['10 мм', '14 мм']}
                        weights={['банка 100г']}
                    />
                    <ProductCard
                        imageSrc="Products/4.jpg"
                        title="Крючки RB-28419"
                        price={129}
                        sizes={['M', 'L']}
                        weights={['упаковка 10 шт']}
                    />
                    <ProductCard
                        imageSrc="Products/1.jpg"
                        title="Бойли розчинні SquidBerry"
                        price={405}
                        sizes={['20 мм', '24 мм']}
                        weights={['zip-уп 1 кг', 'відро 3 кг']}
                    />
                    <ProductCard
                        imageSrc="Products/2.jpg"
                        title="Бойли Krill Fusion"
                        price={379}
                        sizes={['16 мм', '20 мм']}
                        weights={['zip-уп 0.5 кг', 'відро 2 кг']}
                    />
                    <ProductCard
                        imageSrc="Products/3.jpg"
                        title="Pop-ups Ananas"
                        price={189}
                        sizes={['10 мм', '14 мм']}
                        weights={['банка 100г']}
                    />
                    <ProductCard
                        imageSrc="Products/4.jpg"
                        title="Крючки RB-28419"
                        price={129}
                        sizes={['M', 'L']}
                        weights={['упаковка 10 шт']}
                    />
                </UniversalCarousel>
            </div>
        </div>
    );
};

export default ProductCarousel;
