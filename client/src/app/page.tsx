'use client';

import CategoryCarousel from '@/components/app-components/category-carousel';
import FeaturesBenefits from '@/components/app-components/featuresBenefits';
import ProductCarousel from '@/components/app-components/product-carousel';
import Header from '.././components/app-components/header';
import Banner from '../components/app-components/banner';
import Footer from '../components/app-components/footer';
import Hero from '../components/app-components/hero';

export default function Home() {
    return (
        <div className=" bg-[#141414]">
            <Header />
            <Banner />
            <CategoryCarousel />
            <Hero />
            <ProductCarousel />
            <FeaturesBenefits />
            <Footer />
        </div>
    );
}
