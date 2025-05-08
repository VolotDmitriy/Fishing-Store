import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import React, { useEffect, useRef, useState } from 'react';

interface UniversalCarouselProps {
    children: React.ReactNode;
    itemsPerView?: number; // Рекомендуемое значение
    minItemWidth?: number; // Минимальная ширина одного элемента, например 300px
}

function UniversalCarousel({
    children,
    itemsPerView = 3,
    minItemWidth = 320,
}: UniversalCarouselProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [calculatedPerView, setCalculatedPerView] = useState(itemsPerView);

    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const containerWidth = entry.contentRect.width;
                const maxItems = Math.floor(containerWidth / minItemWidth);
                setCalculatedPerView(
                    Math.max(1, Math.min(itemsPerView, maxItems)),
                );
            }
        });

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                resizeObserver.unobserve(containerRef.current);
            }
        };
    }, [itemsPerView, minItemWidth]);

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
                return `basis-[calc(100%/${items})]`;
        }
    };

    const basisClass = getBasisClass(calculatedPerView);

    return (
        <div
            ref={containerRef}
            className="relative w-full overflow-hidden pt-[50px] pb-[38px]"
        >
            <Carousel className="px-[50px]">
                <CarouselContent className="flex flex-row ml-0 w-full">
                    {React.Children.map(children, (child, index) => (
                        <CarouselItem
                            key={index}
                            className={`${basisClass} flex-shrink-0 pl-0 w-fit flex flex-row justify-center items-center`}
                        >
                            {child}
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious
                    className="absolute left-1"
                    variant="ghost_custom"
                />
                <CarouselNext
                    className="absolute right-1"
                    variant="ghost_custom"
                />
            </Carousel>
        </div>
    );
}

export default UniversalCarousel;
