import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import heroFish from './image/Banner.png';

const Hero: React.FC = () => {
  return (
    <section
      className="relative bg-cover bg-center h-[600px] flex items-center"
      style={{ backgroundImage: `url(${heroFish.src})` }}
    >
      <div className="container mx-auto text-left text-white">
        <h1 className="text-5xl font-bold mb-4">DISCOVER THE PERFECT CATCH</h1>
        <p className="text-lg mb-6 max-w-md">
          Our collections are crafted for anglers who demand precision, reliability, and the very best results.
        </p>
        <div className="space-x-4">
          <Link href="/categories">
            <span className="bg-[#00FF85] text-black px-6 py-3 rounded-full font-semibold hover:bg-opacity-80 hover:bg-[#00AA85]">
              Shop Now
            </span>
          </Link>
          <Link href="/filters">
            <span className="border border-[#00FF85] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#00FF85] hover:text-black">
              Apply Filters
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;