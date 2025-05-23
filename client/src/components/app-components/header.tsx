import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Cart from './public/Cart icon.png';
import Logo from './public/game-icons_fishing-net.png';
import SearchBar from './searchBar';

const Header: React.FC = () => {
    return (
        <header className="top-0 left-0 w-full h-20 bg-[#141414] border-b border-[#E5E8EB] z-50 box-border mb-[30px] sticky">
            <div className="h-full  mx-auto flex items-center justify-between">
                <div className="flex shrink-0 pl-[40px] py-[10px]">
                    <Link href="/" className="flex flex-row items-center gap-2">
                        <Image src={Logo} alt="Logo" width={52} height={52} />
                        <span className="text-white font-plus-jakarta-sans font-bold text-[30px] leading-[21px] whitespace-nowrap">
                            LogoFishing
                        </span>
                    </Link>
                </div>

                <nav className="flex flex-auto justify-center gap-[34px] px-[30px]">
                    <Link
                        href="/"
                        className="text-white font-plus-jakarta-sans font-medium text-[20px] leading-[21px] whitespace-nowrap hover:text-[#38E078]"
                    >
                        Home
                    </Link>
                    <Link
                        href="/catalog"
                        className="text-white font-plus-jakarta-sans font-medium text-[20px] leading-[21px] whitespace-nowrap hover:text-[#38E078]"
                    >
                        Categories
                    </Link>
                    <Link
                        href="/contacts"
                        className="text-white font-plus-jakarta-sans font-medium text-[20px] leading-[21px] whitespace-nowrap hover:text-[#38E078]"
                    >
                        Contacts
                    </Link>
                </nav>

                <div className="flex items-center">
                    <SearchBar />
                </div>

                <div className="flex justify-end px-[36px]">
                    <div className="flex flex-row justify-center items-center gap-[8px] ">
                        <button className="w-[40px] h-[40px] bg-[#292929] rounded-[20px] flex justify-center items-center">
                            <Link href="/cart" className="">
                                <Image
                                    src={Cart}
                                    alt="Cart"
                                    width={20}
                                    height={20}
                                />
                            </Link>
                        </button>
                    </div>
                </div>

                {}
            </div>
        </header>
    );
};

export default Header;
