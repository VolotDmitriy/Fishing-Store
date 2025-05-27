'use client';

import CategoryCarousel from '@/components/app-components/category-carousel';
import FeaturesBenefits from '@/components/app-components/featuresBenefits';
import ProductCarousel from '@/components/app-components/product-carousel';
import { Button } from '@/components/ui/button';
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
            <ProductCarousel />
            <FeaturesBenefits />
            <Footer />
            <div className="flex flex-col h-screen items-center justify-center bg-[#141414]">
                <h1>Home</h1>
                <Button onClick={handleClick}>Click</Button>
            </div>
        </div>
    );
}
