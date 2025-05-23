'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CategoryCard from '../category-card';
import UniversalCarousel from '../universal-carousel';

interface CategoryTypeF {
    id: string;
    name: string;
    parentId: string | null;
    createdAt: string;
    updatedAt: string;
}

const CategoryCarousel: React.FC = () => {
    const [categories, setCategories] = useState<CategoryTypeF[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true); 

    const images = [
        'Categories/Reels.png',
        'Categories/Hooks.jpg',
        'Categories/Accessories.jpg',
    ];

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get('http://localhost:4200/category');
                if (res.status === 200) {
                    setCategories(res.data);
                } else {
                    throw new Error('Failed to fetch categories');
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCategories();
    }, []);

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
                    {isLoading
                        ? Array.from({ length: 3 }).map((_, index) => (
                              <div
                                  key={index}
                                  className="w-full flex justify-center mx-4 animate-pulse"
                              >
                                  <div className="w-full max-w-[500px] aspect-square bg-gray-500 rounded-md"></div>
                              </div>
                          ))
                        : categories.map((category, index) => (
                              <CategoryCard
                                  key={category.id}
                                  title={category.name}
                                  imageSrc={images[index % images.length]}
                              />
                          ))}
                </UniversalCarousel>
            </div>
        </div>
    );
};

export default CategoryCarousel;
