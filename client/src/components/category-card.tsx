import Link from 'next/link';
import React from 'react';

interface CategoryCardProps {
    title: string;
    imageSrc: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, imageSrc }) => {
    return (
        <div
            className={`relative w-full max-w-[500px] h-full flex flex-col mx-[8px] items-center overflow-hidden  `}
        >
            <img src={imageSrc} alt={title} className="w-fit h-full" />
            <div className="absolute inset-0 flex flex-col justify-center items-center custom-gradient">
                <h3 className="text-center text-white text-[30px] font-bold mb-[16px]">
                    {title}
                </h3>
                <Link href={`/catalog`} passHref legacyBehavior>
                    <button className="px-[24px] py-[8px] border-2 border-white text-[20px] text-white rounded hover:bg-white hover:text-black transition cursor-pointer">
                        SHOP
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default CategoryCard;
