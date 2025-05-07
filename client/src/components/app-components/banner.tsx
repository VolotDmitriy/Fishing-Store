import Link from 'next/link';
import React from 'react';
import Banner_photo from './public/Banner.png';

const banner: React.FC = () => {
    return (
        <div
            className="w-full flex justify-center bg-[#141414]"
            style={{
                backgroundImage: `url(${Banner_photo.src})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center top',
                imageRendering: 'auto'
            }}
        >
            <div className="w-full h-[760px] flex relative">
                <div className="w-full h-full flex flex-col pl-[60px] pb-[80px] gap-[32px] pr-[200px] justify-end">
                    <div className="w-full flex flex-col items-start gap-[30px]">
                        <h1 className="text-white font-brigends-expanded font-bold text-[48px] tracking-[-2px]">
                            DISCOVER THE PERFECT CATCH
                        </h1>
                        <p className="max-w-[680px] text-white font-plus-jakarta-sans text-base ">
                            Our collections are crafted for anglers who demand
                            precision, reliability, and top performance. The
                            right gear for your best results.
                        </p>
                    </div>
                    <div className="w-full h-[48px] flex flex-row items-center gap-[30px] ">
                        <Link href="/categories" className="flex w-[160px] ">
                            <button className="w-full h-[48px] bg-[#38E078] rounded-[24px] flex justify-center items-center font-plus-jakarta-sans text-black text-base cursor-pointer hover:brightness-85 active:brightness-80 active:opacity-80 transition-all duration-300">
                                Shop Now
                            </button>
                        </Link>
                        <Link href="/filters" className="flex w-[160px]">
                            <button className="w-full h-[48px] bg-[#38E078] rounded-[24px] flex justify-center items-center font-plus-jakarta-sans text-black text-base cursor-pointer hover:brightness-85 active:brightness-80 active:opacity-80 transition-all duration-300">
                                Apply Filters
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default banner;
