import React from 'react';
import CategoryCard from '../category-card';
import UniversalCarousel from '../universal-carousel';

const CategoryCarousel: React.FC = () => {
    return (
        <div className="w-full flex justify-center bg-[#141414]">
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
                    SHOP BY CATEGORY
                </h2>

                <UniversalCarousel itemsPerView={3}>
                    <CategoryCard
                        title="Катушки"
                        imageSrc="Categories/Reels.png"
                    />
                    <CategoryCard
                        title="Крючки"
                        imageSrc="Categories/Hooks.jpg"
                    />
                    <CategoryCard
                        title="Аксессуары"
                        imageSrc="Categories/Accessories.jpg"
                    />
                    <CategoryCard
                        title="Катушки"
                        imageSrc="Categories/Reels.png"
                    />
                    <CategoryCard
                        title="Крючки"
                        imageSrc="Categories/Hooks.jpg"
                    />
                    <CategoryCard
                        title="Аксессуары"
                        imageSrc="Categories/Accessories.jpg"
                    />
                </UniversalCarousel>
            </div>
        </div>
    );
};

export default CategoryCarousel;
