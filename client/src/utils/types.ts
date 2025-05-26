export interface CartItem {
    id: string; // ID варианта
    productId: string; // ID продукта
    name: string; // Название продукта
    variantSku: string; // SKU варианта
    imgURL: string; // URL изображения
    price: number; // Цена
    quantity: number; // Количество
}

export interface Position {
    lat: number;
    lng: number;
}

export interface Settlement {
    Ref: string; // Унікальний ідентифікатор міста
    Description: string; // Назва міста (напр. "Київ")
    SettlementTypeDescription: string; // Тип (напр. "місто")
    AreaDescription: string; // Область (напр. "Київська")
    RegionsDescription: string; // Регіон (напр. "Київський")
    Latitude: string;
    Longitude: string;
}

export interface LocationData {
    settlement: Settlement;
    display_name: string;
    lat: string;
    lon: string;
}

export interface Warehouse {
    Description: string;
    Number: string;
    CityDescription: string;
    TypeOfWarehouse: string;
}

export interface DiscountResponse {
    discount?: { id: string; name: string; percentage: number };
    message?: string;
}

export type DeliveryMethod = 'warehouse' | 'postomat';
