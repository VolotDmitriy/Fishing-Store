'use client';

import LocationSelector from '@/components/location-selector';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin } from 'lucide-react';
import { useState } from 'react';

interface Position {
    lat: number;
    lng: number;
}

const defaultPosition: Position = { lat: 50.4501, lng: 30.5234 };

const OrderForm = () => {
    const [selectedLocation, setSelectedLocation] = useState<string>(
        'УКРАЇНА / КИЇВСЬКА ОБЛ / М.КИЇВ',
    );
    const [markerPosition, setMarkerPosition] =
        useState<Position>(defaultPosition);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    return (
        <div className="p-6 bg-black text-white min-h-screen font-jakarta">
            <h1 className="text-4xl font-bold mb-6">
                REGISTRATION OF AN ORDER
            </h1>

            <div className="flex flex-row gap-6 min-h-0 h-full">
                <div className="flex flex-col w-1/2 gap-6 flex-1">
                    <h2 className="text-lg font-semibold mb-4">
                        Your contact information
                    </h2>
                    <div className="grid grid-cols-2 gap-6 text-xl">
                        <div>
                            <Input
                                placeholder="Your first name"
                                className="rounded-none bg-transparent border-[B1B1B1] border-2 text-white placeholder-gray-500 h-14"
                            />
                        </div>
                        <div>
                            <Input
                                placeholder="+38(095) 123-45-67"
                                className="rounded-none bg-transparent border-[B1B1B1] border-2 text-white placeholder-gray-500 h-14"
                            />
                        </div>
                        <div>
                            <Input
                                placeholder="Your second name"
                                className="rounded-none bg-transparent border-[B1B1B1] border-2 text-white placeholder-gray-500 h-14"
                            />
                        </div>
                        <div>
                            <Input
                                placeholder="example@gmail.com"
                                className="rounded-none bg-transparent border-[B1B1B1] gray-700 border-2 text-white placeholder-gray-500 h-14"
                            />
                        </div>
                        <div className="col-span-2">
                            <Textarea
                                placeholder="Addition comment"
                                className="rounded-none bg-transparent border-[B1B1B1] border-2 text-white placeholder-gray-500 h-32 w-full resize-none"
                            />
                        </div>
                    </div>
                </div>
                <div className="w-1/2 grid grid-cols-1 grid-rows-2 gap-6 flex-1 pt-17">
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger asChild>
                            <Button
                                variant="outline"
                                className="w-full h-full border-white rounded-none text-white flex justify-between items-center"
                            >
                                <div className="flex w-full items-center gap-3">
                                    <MapPin className="size-15" />
                                    <div className="flex flex-col grow gap-2.5 items-start justify-between truncate">
                                        <span className="text-xl">
                                            {selectedLocation}
                                        </span>
                                        <span className="min-w-fit text-[#474747]">
                                            Доставка до вашого місця
                                        </span>
                                    </div>

                                    <span className="min-w-fit uppercase">
                                        Змінити
                                    </span>
                                </div>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-black text-white border-white max-w-[90vw] max-h-[90vh]">
                            <DialogHeader>
                                <DialogTitle className="text-white">
                                    Choose Delivery Location
                                </DialogTitle>
                            </DialogHeader>
                            <LocationSelector
                                selectedLocation={selectedLocation}
                                setSelectedLocation={setSelectedLocation}
                                markerPosition={markerPosition}
                                setMarkerPosition={setMarkerPosition}
                            />
                        </DialogContent>
                    </Dialog>

                    <div className="w-full border border-orange-500 px-14 py-7 text-1.5 text-[#474747]">
                        <p>
                            Зверніть увагу! Доставка у ваш регіон може зайняти
                            від 1 до 3 днів. Деякі товари можуть бути недоступні
                            для доставки. Переконайтеся, що місто вибрано
                            правильно, щоб побачити актуальні способи доставки
                            та точну вартість. Якщо потрібно змінити
                            місцезнаходження, натисніть "Змінити".
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderForm;
