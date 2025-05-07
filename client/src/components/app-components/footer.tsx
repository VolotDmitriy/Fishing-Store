import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import youtube from './public/footer/youtube.svg';
import facebook from './public/footer/facebook.svg';
import instagram from './public/footer/instagram.svg';
import telegram from './public/footer/telegram.svg';
import Logo from './public/game-icons_fishing-net.png';
import icon1 from './public/footer/copyright.svg';
import image from './public/footer/image 20.svg';

const Footer: React.FC = () => {
  return (
    <footer className="w-full h-[400px] bottom-0 bg-[#242424] flex flex-col px-[60px] py-[10px]">
      <div className="w-full h-full flex flex-row pt-[20px] pb-[40px] justify-between border-b-2 border-[#38E078] box-border">
        <div className="min-w-[300px] h-full flex flex-row justify-end items-center pl-[40px] md:gap-[20px] gap-[10px] ">
            <Image
              src={Logo}
              alt="Fishing Net"
              width={92}
              height={92}
              style={{ filter: 'drop-shadow(0px 7.16271px 7.16271px rgba(0, 0, 0, 0.25))' }}
            />
            <span className=" h-[24px] text-white font-plus-jakarta-sans font-bold text-[32px] leading-[6px] text-center">
              LogoFishing
            </span>
        </div>


        <div className=" w-full max-w-[800px] flex flex-row justify-between py-[10px] gap-[40px] mx-[30px] leading-[1]">
        <div className=" flex flex-col items-start py-[10px] gap-[30px] ">
          <h3 className=" text-[#38E078] font-brigends-expanded font-bold text-[20px] flex ">
            NAVIGATION
          </h3>
          <div className=" flex flex-row items-start ">
            <div className="flex flex-col items-start gap-[20px] ">
              <Link href="/" className="text-white font-plus-jakarta-sans text-[18px] hover:text-[#38E078]">
                Home
              </Link>
              <Link href="/categories" className="text-white font-plus-jakarta-sans text-[18px] hover:text-[#38E078]">
              Categories
              </Link>
              <Link href="/contacts" className="text-white font-plus-jakarta-sans text-[18px] hover:text-[#38E078]">
              Contacts
              </Link>
              <Link href="/shopCart" className="text-white font-plus-jakarta-sans text-[18px] hover:text-[#38E078]">
              Shop Cart
              </Link>
              <Link href="/yourFavorite" className="text-white font-plus-jakarta-sans text-[18px] hover:text-[#38E078]">
              Your Favorite
              </Link>
            </div>
          </div>
        </div>

        <div className="min-w-[154px] h-full flex flex-col items-start py-[10px] gap-[30px] leading-[1]">
          <h3 className=" text-[#38E078] font-brigends-expanded font-bold text-[20px] flex ">
          CATEGORIES
          </h3>
          <div className=" flex flex-row items-start ">
            <div className="flex flex-col items-start gap-[20px] ">
              <Link href="/categories/id=fishingRods" className="text-white font-plus-jakarta-sans text-[18px] hover:text-[#38E078]">
              Fishing Rods
              </Link>
              <Link href="/categories/id=spinningReels" className="text-white font-plus-jakarta-sans text-[18px] hover:text-[#38E078]">
              Spinning Reels
              </Link>
              <Link href="/categories/id=baitFeeders" className="text-white font-plus-jakarta-sans text-[18px] hover:text-[#38E078]">
              Bait Feeders
              </Link>
              <Link href="/categories/id=hookRigs" className="text-white font-plus-jakarta-sans text-[18px] hover:text-[#38E078]">
              Hook Rigs
              </Link>
              <Link href="/categories/id=fishingAccessories" className="text-white font-plus-jakarta-sans text-[18px] hover:text-[#38E078]">
              Fishing Accessories
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full max-w-[220px] h-full flex flex-col items-start py-[10px] gap-[30px] leading-[1]">
          <h3 className=" text-[#38E078] font-brigends-expanded font-bold text-[20px] flex ">
          CONTACTS
          </h3>
          <div className="w-full flex flex-row items-start ">
            <div className="w-full flex flex-col items-start gap-[20px] ">
              <span className="text-white font-plus-jakarta-sans text-[18px] hover:text-[#38E078]">
              (067) 657-24-48
              </span>
              <span className="text-white font-plus-jakarta-sans text-[18px] hover:text-[#38E078]">
              (067) 380-21-86
              </span>
              <span className="text-white font-plus-jakarta-sans text-[18px] hover:text-[#38E078]">
              logoFishing@gmail.com
              </span>
              <div className="w-full flex flex-row justify-between gap-[6px]">
                <Image src={youtube} alt="Footer Image" width={42} height={42}
                className="cursor-pointer filter grayscale hover:grayscale-10 transition-all duration-300" />
                <Image src={telegram} alt="Footer Image" width={42} height={42} className="cursor-pointer filter grayscale hover:grayscale-10 transition-all duration-300" />
                <Image src={instagram} alt="Footer Image" width={42} height={42} className="cursor-pointer filter grayscale hover:grayscale-10 transition-all duration-300" />  
                <Image src={facebook} alt="Footer Image" width={42} height={42} className="cursor-pointer filter grayscale hover:grayscale-10 transition-all duration-300"  />
              </div>
            </div>
          </div>
        </div>
        </div>
        <div className="min-w-[100px] min-h-[74px] h-full flex items-center">
          <Image src={image} alt="Footer Image" width={196} height={146} style={{ mixBlendMode: 'multiply' }} />
        </div>
      </div>
      
      <div className="w-full h-full flex flex-row justify-between items-center px-[40px]">
        <div className=" h-full flex flex-col justify-center">
            <span className="text-[#AAAAAA] font-plus-jakarta-sans text-[18px]">
            2025 All rights reserved. 
            </span>
        </div>
        <div className="h-full flex flex-row items-center gap-[10px]">
        <Image src={icon1} alt="Footer Image" width={24} height={24} className="cursor-pointer filter grayscale hover:grayscale-10 transition-all duration-300"  />
          <span className="text-[#AAAAAA] font-plus-jakarta-sans text-[18px]">
          LogoFishing
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;