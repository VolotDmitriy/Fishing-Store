'use client';

import { ProductType } from '@/components/data-table/types';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Search from './public/Search icon.png';

const SearchBar = () => {
    const [allProducts, setAllProducts] = useState<ProductType[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [showList, setShowList] = useState<boolean>(false);

    const searchBarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get<ProductType[]>(
                    'http://localhost:4200/product?full=true',
                );
                setAllProducts(res.data);
            } catch (error) {
                console.error('Не удалось загрузить продукты:', error);
                setError('Не удалось загрузить продукты');
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        if (searchTerm) {
            const filtered = allProducts.filter((product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()),
            );
            setFilteredProducts(filtered);
            setShowList(true);
        } else {
            setFilteredProducts([]);
            setShowList(false);
        }
    }, [searchTerm, allProducts]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                searchBarRef.current &&
                !searchBarRef.current.contains(event.target as Node)
            ) {
                setShowList(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={searchBarRef} className="relative">
            <div className="flex items-center">
                <div className="max-w-[256px] h-[40px] bg-[#292929] rounded-[12px] flex flex-row items-center px-[16px] gap-[8px]">
                    <Image src={Search} alt="Search" width={24} height={24} />
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full h-[24px] bg-transparent text-[#C4C4C4] font-plus-jakarta-sans text-base leading-[24px] outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => searchTerm && setShowList(true)}
                    />
                </div>
            </div>
            {error && <div>{error}</div>}
            {!isLoading &&
                !error &&
                showList &&
                filteredProducts.length > 0 && (
                    <div className="absolute top-full left-0 w-full max-h-60 overflow-y-auto scrollbar bg-[#141414] border border-gray-300 rounded-md z-10">
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="p-2 hover:bg-gray-700 cursor-pointer text-white"
                            >
                                <Link
                                    href={`/${product.id}`}
                                    passHref
                                    legacyBehavior
                                >
                                    {product.name}
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            {!isLoading &&
                !error &&
                showList &&
                filteredProducts.length === 0 &&
                searchTerm && (
                    <div className="absolute top-full left-0 w-full bg-[#141414] border border-gray-300 rounded-md z-10 p-2 text-white">
                        Продукты не найдены
                    </div>
                )}
        </div>
    );
};

export default SearchBar;
