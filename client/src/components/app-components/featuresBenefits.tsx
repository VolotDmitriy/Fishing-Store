import React from 'react';
import Image from 'next/image';
import workspace_premium from './public/img/workspace_premium.svg';
import savings from './public/img/savings.svg';
import phishing from './public/img/phishing.svg';
import build from './public/img/build.svg';
import speed from './public/img/speed.svg';


const featuresBenefits: React.FC = () => {
  return (
    <section
      className=" w-full h-[526px] flex flex-col bg-[#141414] mb-[30px] "
    >
      <div className="w-full flex justify-center pt-[60px]">
        <h2 className="text-white font-brigends-expanded text-[44px] font-bold leading-[1] flex items-end ">
          Features and Benefits
        </h2>
      </div>
     
     <div className="w-full h-full flex flex-row justify-center px-[60px] pt-[30px] pb-[50px] leading-[1] bg-[#141414]">
     <div className="w-full max-w-[1400px] h-full flex flex-row justify-between items-center gap-[10px]">
        <div className="max-w-[220px] min-w-[140px] h-full flex flex-col justify-start items-center pt-[40px] px-[14px] gap-[20px]">
          <Image src={savings} alt="Best Value" width={138} height={138} />
          <h3 className="text-white font-brigends-expanded text-[20px] text-center font-bold">
            Best Value for Money
          </h3>
          <p className="text-white font-plus-jakarta-sans text-sm text-center">
            We select products with the perfect balance of price and quality, making every purchase a great deal.
          </p>
        </div>
        <div className="max-w-[220px] min-w-[140px] h-full flex flex-col justify-start items-center pt-[40px] px-[14px] gap-[20px]">
          <Image src={phishing} alt="Designed for Anglers" width={138} height={138} />
          <h3 className="text-white font-brigends-expanded text-[20px] text-center font-bold">
            Designed for Anglers
          </h3>
          <p className="text-white font-plus-jakarta-sans text-sm text-center">
            Tackle and accessories created with the needs of anglers in mind, no matter their fishing style.
          </p>
        </div>
        <div className="max-w-[220px] min-w-[140px] h-full flex flex-col justify-start items-center pt-[40px] px-[14px] gap-[20px]">
          <Image src={workspace_premium} alt="Quality You Can Trust" width={138} height={138} />
          <h3 className="text-white font-brigends-expanded text-[20px] text-center font-bold">
            Quality You Can Trust
          </h3>
          <p className="text-white font-plus-jakarta-sans text-sm text-center">
            We offer only tested rigs and stable accessories made with high-quality materials.
          </p>
        </div>
        <div className="max-w-[220px] min-w-[140px] h-full flex flex-col items-center pt-[40px] px-[14px] gap-[20px]">
          <Image src={build} alt="Reliable and Durable" width={138} height={138} />
          <h3 className="text-white font-brigends-expanded text-[20px] text-center font-bold">
            Reliable and Durable
          </h3>
          <p className="text-white font-plus-jakarta-sans text-sm text-center">
            Our tackle is designed to withstand heavy loads and long fishing sessions in any conditions.
          </p>
        </div>
        <div className="max-w-[220px] min-w-[140px] h-full flex flex-col items-center pt-[40px] px-[14px] gap-[20px]">
          <Image src={speed} alt="Optimized Performance" width={138} height={138} />
          <h3 className="text-white font-brigends-expanded text-[20px] text-center font-bold">
            Optimized Performance
          </h3>
          <p className="text-white font-plus-jakarta-sans text-sm text-center">
            Pre-tied rigs assembled by professionals to ensure maximum efficiency and ease of use.
          </p>
        </div>
      </div>
     </div>
    </section>
  );
};

export default featuresBenefits;