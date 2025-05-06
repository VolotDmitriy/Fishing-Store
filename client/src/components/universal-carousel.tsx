import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import React from 'react';

interface UniversalCarouselProps {
    children: React.ReactNode;
    itemsPerView?: number;
}

function UniversalCarousel({
    children,
    itemsPerView = 1,
}: UniversalCarouselProps) {
    const getBasisClass = (items: number): string => {
        switch (items) {
            case 1:
                return 'basis-full';
            case 2:
                return 'basis-1/2';
            case 3:
                return 'basis-1/3';
            case 4:
                return 'basis-1/4';
            case 5:
                return 'basis-1/5';
            default:
                return 'basis-full';
        }
    };

    const basisClass = getBasisClass(itemsPerView);

    return (
        <div className="relative w-full overflow-hidden pb-10">
            <Carousel className="px-10">
                <CarouselContent className="flex flex-row ml-0 w-full">
                    {React.Children.map(children, (child, index) => (
                        <CarouselItem
                            key={index}
                            className={`${basisClass} flex-shrink-0 pl-0 w-fit flex flex-row`}
                        >
                            {child}
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious
                    className="absolute left-1"
                    variant={'ghost_custom'}
                />
                <CarouselNext
                    className="absolute right-1"
                    variant={'ghost_custom'}
                />
            </Carousel>
        </div>
    );
}

export default UniversalCarousel;
