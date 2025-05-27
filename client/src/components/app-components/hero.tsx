import React from 'react';
import Hero_photo from './public/Photo.png';

const hero: React.FC = () => {
    return (
        <div className="w-full flex justify-center h-[482px] px-[82px] my-[50px] ">
            <div
                className="w-full h-full flex justify-center rounded-[15px] overflow-hidden"
                style={{
                    backgroundImage: `url(${Hero_photo.src})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    imageRendering: 'auto',
                }}
            >
                <div className="w-full h-full flex flex-col justify-center items-center gap-[30px] bg-black/40 backdrop-blur-[10px] px-[200px] ">
                    <h1 className="w-full text-white font-brigends-expanded text-[48px] font-bold tracking-[-2px] text-center leading-[1]">
                        READY TO FISH
                    </h1>
                    <p className="w-full text-white font-plus-jakarta-sans text-base text-center leading-[1]">
                        Browse our catalog for premium rigs and accessories that
                        fit your style.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default hero;
