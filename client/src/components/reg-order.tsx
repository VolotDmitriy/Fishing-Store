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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { LocationData, Position } from '@/utils/types';
import { MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Label } from './ui/label';
import WarehouseSelector from './warehouse-selector';

const defaultSettlement = {
    Ref: 'e718a680-4b33-11e4-ab6d-005056801329',
    Description: 'Київ',
    SettlementTypeDescription: 'місто',
    AreaDescription: 'Київська',
    RegionsDescription: '',
    Latitude: '50.450418',
    Longitude: '30.523541',
};

const defaultLocationData: LocationData = {
    settlement: defaultSettlement,
    display_name: 'місто, Київ, Київська обл.',
    lat: defaultSettlement.Latitude,
    lon: defaultSettlement.Longitude,
};

const defaultPosition: Position = {
    lat: parseFloat(defaultLocationData.lat),
    lng: parseFloat(defaultLocationData.lon),
};

type DeliveryMethod = 'warehouse' | 'postomat';

const OrderForm = () => {
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [locationData, setLocationData] =
        useState<LocationData>(defaultLocationData);
    const [markerPosition, setMarkerPosition] =
        useState<Position>(defaultPosition);
    const [deliveryMethod, setDeliveryMethod] =
        useState<DeliveryMethod>('warehouse');
    const [selectedDeliveryPoint, setSelectedDeliveryPoint] =
        useState<string>('');

    // Скидаємо вибір відділення/поштомата при зміні локації
    useEffect(() => {
        setSelectedDeliveryPoint('');
    }, [locationData.settlement.Ref]);

    const getFormattedLocation = (): string => {
        const { settlement } = locationData;
        return `${settlement.SettlementTypeDescription}, ${settlement.Description}, ${settlement.AreaDescription} обл.${settlement.RegionsDescription !== '' ? `, (${settlement.RegionsDescription} р-н)` : ''}`;
    };

    const onDeliveryPointSelect = (point: string, method: DeliveryMethod) => {
        setSelectedDeliveryPoint(point);
        setDeliveryMethod(method);
    };

    return (
        <div className="p-6 bg-black text-white min-h-screen font-jakarta">
            <h1 className="text-4xl font-bold mb-6">
                REGISTRATION OF AN ORDER
            </h1>

            <div className="flex flex-row gap-6 min-h-0 h-full">
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
                                            {getFormattedLocation()}
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
                                locationData={locationData}
                                setLocationData={setLocationData}
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

                    <div>
                        <h2 className="text-lg font-semibold mb-4">Delivery</h2>
                        <RadioGroup
                            value={deliveryMethod}
                            onValueChange={(value) => {
                                setDeliveryMethod(value as DeliveryMethod);
                                setSelectedDeliveryPoint('');
                            }}
                            className="space-y-4"
                        >
                            <div className="flex items-center space-x-4">
                                <RadioGroupItem
                                    value="warehouse"
                                    id="warehouse"
                                />
                                <Label
                                    htmlFor="warehouse"
                                    className="text-white"
                                >
                                    Відділення NovaPost
                                </Label>
                                <WarehouseSelector
                                    settlementRef={locationData.settlement.Ref}
                                    selectedWarehouse={
                                        deliveryMethod === 'warehouse'
                                            ? selectedDeliveryPoint
                                            : ''
                                    }
                                    setSelectedWarehouse={(point: string) =>
                                        onDeliveryPointSelect(
                                            point,
                                            'warehouse',
                                        )
                                    }
                                    warehouseType="warehouse"
                                />
                            </div>
                            <div className="flex items-center space-x-4">
                                <RadioGroupItem
                                    value="postomat"
                                    id="postomat"
                                />
                                <Label
                                    htmlFor="postomat"
                                    className="text-white"
                                >
                                    Поштомат NovaPost
                                </Label>
                                <WarehouseSelector
                                    settlementRef={locationData.settlement.Ref}
                                    selectedWarehouse={
                                        deliveryMethod === 'postomat'
                                            ? selectedDeliveryPoint
                                            : ''
                                    }
                                    setSelectedWarehouse={(point: string) =>
                                        onDeliveryPointSelect(point, 'postomat')
                                    }
                                    warehouseType="postomat"
                                />
                            </div>
                        </RadioGroup>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderForm;
