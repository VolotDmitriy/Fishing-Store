'use client';

import CategoryCarousel from '@/components/app-components/category-carousel';
import FeaturesBenefits from '@/components/app-components/featuresBenefits';
import ProductCard from '@/components/product-card';
import { Button } from '@/components/ui/button';
import UniversalCarousel from '@/components/universal-carousel';
import { useRouter } from 'next/navigation';
import Header from '.././components/app-components/header';
import Banner from '../components/app-components/banner';
import Footer from '../components/app-components/footer';
import Hero from '../components/app-components/hero';

export default function Home() {
    const router = useRouter();
    const handleClick = () => {
        router.push(`/auth-admin`);
    };

    return (
        <div className=" bg-[#141414]">
            <Header />
            <Banner />
            <CategoryCarousel />
            <Hero />
            <FeaturesBenefits />
            <Footer />
            <div className="flex flex-col h-screen items-center justify-center bg-[#141414]">
                <h1>Home</h1>
                <Button onClick={handleClick}>Click</Button>
                <div
                    className={
                        'flex flex-col w-full items-center justify-center bg-gray-800'
                    }
                >
                    <h2 className={'font-brigend pt-9'}>TOP PRODUCTS</h2>

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
        </div>
    );
}
