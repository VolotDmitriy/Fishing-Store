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
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { fetchWarehouses } from '@/utils/requests';
import {
    DeliveryMethod,
    LocationData,
    Position,
    Warehouse,
} from '@/utils/types';
import { MapPin } from 'lucide-react';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import WarehouseSelector from './warehouse-selector';

interface OrderData {
    firstName: string;
    secondName: string;
    phone: string;
    email: string;
    comment: string;
    location: LocationData;
    deliveryMethod: DeliveryMethod;
    selectedDeliveryPoint: string;
}

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

const OrderForm = forwardRef<
    { getOrderData: () => OrderData; reset: () => void },
    {}
>((props, ref) => {
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [locationData, setLocationData] =
        useState<LocationData>(defaultLocationData);
    const [markerPosition, setMarkerPosition] =
        useState<Position>(defaultPosition);
    const [deliveryMethod, setDeliveryMethod] =
        useState<DeliveryMethod>('warehouse');
    const [selectedDeliveryPoint, setSelectedDeliveryPoint] =
        useState<string>('');
    const [warehouses, setWarehouses] = useState<{
        warehouse: Warehouse[];
        postomat: Warehouse[];
    }>({
        warehouse: [],
        postomat: [],
    });
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [comment, setComment] = useState('');

    useImperativeHandle(ref, () => ({
        getOrderData: () => ({
            firstName,
            secondName,
            phone,
            email,
            comment,
            location: locationData,
            deliveryMethod,
            selectedDeliveryPoint,
        }),
        reset: () => {
            setFirstName('');
            setSecondName('');
            setPhone('');
            setEmail('');
            setComment('');
            setLocationData(defaultLocationData);
            setMarkerPosition(defaultPosition);
            setDeliveryMethod('warehouse');
            setSelectedDeliveryPoint('');
        },
    }));

    useEffect(() => {
        setIsLoading(true);
        const fetchAllWarehouses = async () => {
            try {
                const [warehouseData, postomatData] = await Promise.all([
                    fetchWarehouses(locationData.settlement.Ref, 'warehouse'),
                    fetchWarehouses(locationData.settlement.Ref, 'postomat'),
                ]);
                setWarehouses({
                    warehouse: warehouseData as Warehouse[],
                    postomat: postomatData as Warehouse[],
                });
                setSelectedDeliveryPoint('');
            } catch (error) {
                console.error('Помилка при завантаженні відділень:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAllWarehouses();
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
                <div className="flex flex-col w-1/2 gap-6 flex-1">
                    <h2 className="text-lg font-semibold mb-4">
                        Your contact information
                    </h2>
                    <div className="grid grid-cols-2 gap-6 text-xl">
                        <div>
                            <Input
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="Your first name"
                                className="rounded-none bg-transparent border-[B1B1B1] border-2 text-white placeholder-gray-500 h-10"
                            />
                        </div>
                        <div>
                            <Input
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="+38(095) 123-45-67"
                                className="rounded-none bg-transparent border-[B1B1B1] border-2 text-white placeholder-gray-500 h-10"
                            />
                        </div>
                        <div>
                            <Input
                                value={secondName}
                                onChange={(e) => setSecondName(e.target.value)}
                                placeholder="Your second name"
                                className="rounded-none bg-transparent border-[B1B1B1] border-2 text-white placeholder-gray-500 h-10"
                            />
                        </div>
                        <div>
                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="example@gmail.com"
                                className="rounded-none bg-transparent border-[B1B1B1] gray-700 border-2 text-white placeholder-gray-500 h-10"
                            />
                        </div>
                        <div className="col-span-2">
                            <Textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
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
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            <RadioGroup
                                value={deliveryMethod}
                                onValueChange={(value) => {
                                    setDeliveryMethod(value as DeliveryMethod);
                                    setSelectedDeliveryPoint('');
                                }}
                            >
                                {/* Green Stripe Divider */}
                                <hr className="border-t-1 border-green-500 my-2" />

                                <div className="flex items-center space-x-8 my-4">
                                    <RadioGroupItem
                                        value="warehouse"
                                        id="warehouse"
                                        className="border-[#0DC85D] data-[state=checked]:border-[#0DC85D] data-[state=checked]:[&_svg]:fill-[#0DC85D] w-6 h-6"
                                    />

                                    <Label
                                        htmlFor="warehouse"
                                        className="flex flex-1 text-white text-xl font-jakarta"
                                    >
                                        Post office NovaPosta
                                    </Label>
                                    <div className="flex items-center gap-2">
                                        <WarehouseSelector
                                            warehouses={warehouses.warehouse}
                                            selectedWarehouse={
                                                deliveryMethod === 'warehouse'
                                                    ? selectedDeliveryPoint
                                                    : ''
                                            }
                                            setSelectedWarehouse={(
                                                point: string,
                                            ) =>
                                                onDeliveryPointSelect(
                                                    point,
                                                    'warehouse',
                                                )
                                            }
                                            warehouseType="warehouse"
                                        />
                                    </div>
                                </div>

                                {/* Green Stripe Divider */}
                                <hr className="border-t-1 border-green-500 my-2" />

                                <div className="flex items-center space-x-8 my-4">
                                    <RadioGroupItem
                                        value="warehouse"
                                        id="warehouse"
                                        className="border-[#0DC85D] data-[state=checked]:border-[#0DC85D] data-[state=checked]:[&_svg]:fill-[#0DC85D] w-6 h-6"
                                    />
                                    <Label
                                        htmlFor="postomat"
                                        className="flex flex-1 text-white text-xl font-jakarta"
                                    >
                                        Parcel locker NovaPosta
                                    </Label>
                                    <div className="flex items-center gap-2">
                                        <WarehouseSelector
                                            warehouses={warehouses.postomat}
                                            selectedWarehouse={
                                                deliveryMethod === 'postomat'
                                                    ? selectedDeliveryPoint
                                                    : ''
                                            }
                                            setSelectedWarehouse={(
                                                point: string,
                                            ) =>
                                                onDeliveryPointSelect(
                                                    point,
                                                    'postomat',
                                                )
                                            }
                                            warehouseType="postomat"
                                        />
                                    </div>
                                </div>

                                {/* Green Stripe Divider */}
                                <hr className="border-t-1 border-green-500 my-2" />
                            </RadioGroup>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});

export default OrderForm;
