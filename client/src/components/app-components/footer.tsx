import icon1 from '@/components/app-components/public/footer/copyright.svg';
import facebook from '@/components/app-components/public/footer/facebook.svg';
import image from '@/components/app-components/public/footer/image 20.svg';
import instagram from '@/components/app-components/public/footer/instagram.svg';
import telegram from '@/components/app-components/public/footer/telegram.svg';
import youtube from '@/components/app-components/public/footer/youtube.svg';
import Logo from '@/components/app-components/public/game-icons_fishing-net.png';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="w-full h-[400px] bottom-0 bg-[#242424] flex flex-col px-[60px] py-[10px]">
            <div className="w-full h-full flex flex-row pt-[20px] pb-[40px] justify-between border-b-2 border-[#38E078] box-border">
                <div className="min-w-[300px] h-full flex flex-row justify-end items-center pl-[40px] md:gap-[20px] gap-[10px]">
                    <Image
                        src={Logo}
                        alt="Fishing Net"
                        width={92}
                        height={92}
                        style={{
                            filter: 'drop-shadow(0px 7.16271px 7.16271px rgba(0, 0, 0, 0.25))',
                        }}
                    />
                    <span className="h-[24px] text-white font-jakarta font-bold text-[32px] leading-[6px] text-center">
                        LogoFishing
                    </span>
                </div>

                <div className="w-full max-w-[800px] flex flex-row justify-between py-[10px] gap-[40px] mx-[30px] leading-[1]">
                    <div className="flex flex-col items-start py-[10px] gap-[30px]">
                        <h3 className="text-[#38E078] font-brigends-expanded font-bold text-[20px] flex">
                            NAVIGATION
                        </h3>
                        <div className="flex flex-row items-start">
                            <div className="flex flex-col items-start gap-[20px]">
                                <Link
                                    href="/"
                                    className="text-white font-jakarta text-[18px] hover:text-[#38E078]"
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/catalog"
                                    className="text-white font-jakarta text-[18px] hover:text-[#38E078]"
                                >
                                    Categories
                                </Link>
                                <Link
                                    href="/contacts"
                                    className="text-white font-jakarta text-[18px] hover:text-[#38E078]"
                                >
                                    Contacts
                                </Link>
                                <Link
                                    href="/cart"
                                    className="text-white font-jakarta text-[18px] hover:text-[#38E078]"
                                >
                                    Shop Cart
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="min-w-[154px] h-full flex flex-col items-start py-[10px] gap-[30px] leading-[1]">
                        <h3 className="text-[#38E078] font-brigends-expanded font-bold text-[20px] flex">
                            CATEGORIES
                        </h3>
                        <div className="flex flex-row items-start">
                            <div className="flex flex-col items-start gap-[20px]">
                                <Link
                                    href="/catalog/udochky"
                                    className="text-white font-jakarta text-[18px] hover:text-[#38E078]"
                                >
                                    Fishing Rods
                                </Link>
                                <Link
                                    href="/catalog/katushky"
                                    className="text-white font-jakarta text-[18px] hover:text-[#38E078]"
                                >
                                    Spinning Reels
                                </Link>
                                <Link
                                    href="/catalog/voblery"
                                    className="text-white font-jakarta text-[18px] hover:text-[#38E078]"
                                >
                                    Bait wobbler
                                </Link>
                                <Link
                                    href="/catalog/kryuchky"
                                    className="text-white font-jakarta text-[18px] hover:text-[#38E078]"
                                >
                                    Hook Rigs
                                </Link>
                                <Link
                                    href="/catalog/leska"
                                    className="text-white font-jakarta text-[18px] hover:text-[#38E078]"
                                >
                                    Fishing Accessories
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="w-full max-w-[220px] h-full flex flex-col items-start py-[10px] gap-[30px] leading-[1]">
                        <h3 className="text-[#38E078] font-brigends-expanded font-bold text-[20px] flex">
                            CONTACTS
                        </h3>
                        <div className="w-full flex flex-row items-start">
                            <div className="w-full flex flex-col items-start gap-[20px]">
                                <a
                                    href="tel:+380676572448"
                                    className="text-white font-jakarta text-[18px] hover:text-[#38E078] transition-colors"
                                >
                                    (067) 657-24-48
                                </a>
                                <a
                                    href="tel:+380673802186"
                                    className="text-white font-jakarta text-[18px] hover:text-[#38E078] transition-colors"
                                >
                                    (067) 380-21-86
                                </a>
                                <a
                                    href="mailto:logoFishing@gmail.com"
                                    className="text-white font-jakarta text-[18px] hover:text-[#38E078] transition-colors"
                                >
                                    logoFishing@gmail.com
                                </a>
                                <div className="w-full flex flex-row justify-between gap-[6px]">
                                    <Link
                                        href="https://youtube.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Image
                                            src={youtube}
                                            alt="YouTube"
                                            width={42}
                                            height={42}
                                            className="cursor-pointer filter grayscale hover:grayscale-0 transition-all duration-300"
                                        />
                                    </Link>
                                    <Link
                                        href="https://telegram.org"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Image
                                            src={telegram}
                                            alt="Telegram"
                                            width={42}
                                            height={42}
                                            className="cursor-pointer filter grayscale hover:grayscale-0 transition-all duration-300"
                                        />
                                    </Link>
                                    <Link
                                        href="https://instagram.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Image
                                            src={instagram}
                                            alt="Instagram"
                                            width={42}
                                            height={42}
                                            className="cursor-pointer filter grayscale hover:grayscale-0 transition-all duration-300"
                                        />
                                    </Link>
                                    <Link
                                        href="https://facebook.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Image
                                            src={facebook}
                                            alt="Facebook"
                                            width={42}
                                            height={42}
                                            className="cursor-pointer filter grayscale hover:grayscale-0 transition-all duration-300"
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="min-w-[100px] min-h-[74px] h-full flex items-center">
                    <Image
                        src={image}
                        alt="Footer Image"
                        width={196}
                        height={146}
                        style={{ mixBlendMode: 'multiply' }}
                    />
                </div>
            </div>

            <div className="w-full h-full flex flex-row justify-between items-center px-[40px]">
                <div className="h-full flex flex-col justify-center">
                    <span className="text-[#AAAAAA] font-jakarta text-[18px]">
                        2025 All rights reserved.
                    </span>
                </div>
                <div className="h-full flex flex-row items-center gap-[10px]">
                    <Image
                        src={icon1}
                        alt="Copyright"
                        width={24}
                        height={24}
                        className="cursor-pointer filter grayscale hover:grayscale-0 transition-all duration-300"
                    />
                    <span className="text-[#AAAAAA] font-jakarta text-[18px]">
                        LogoFishing
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
