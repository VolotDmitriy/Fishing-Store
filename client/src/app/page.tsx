'use client';

import CategoryCard from '@/components/category-card';
import { Button } from '@/components/ui/button';
import UniversalCarousel from '@/components/universal-carousel';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();
    const handleClick = () => {
        router.push(`/auth-admin`);
    };

    return (
        <>
            <div className="flex flex-col h-screen items-center justify-center bg-violet-500">
                <h1>Home</h1>
                <Button onClick={handleClick}>Click</Button>

                <div
                    className={
                        'flex flex-col items-center justify-center bg-gray-800'
                    }
                >
                    <h2 className={'pt-9'}>SHOP BY CATEGORY</h2>

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
        </>
    );
}
