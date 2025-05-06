import React from 'react';

interface CategoryCardProps {
    title: string;
    imageSrc: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, imageSrc }) => {
    return (
        <div
            className={`relative flex flex-col items-center bg-gray-800 overflow-hidden w-full h-full mx-[25px]`}
        >
            <img src={imageSrc} alt={title} className="w-fit h-full" />
            <div className="absolute inset-0 flex flex-col justify-center items-center custom-gradient">
                <h3 className="text-white text-xl font-bold mb-4">{title}</h3>
                <button className="px-6 py-2 border-2 border-white text-white rounded hover:bg-white hover:text-black transition">
                    SHOP
                </button>
            </div>
        </div>
    );
};

export default CategoryCard;
