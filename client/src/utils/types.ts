export interface CartItem {
    id: string;
    name: string;
    imgURL: string;
    price: number;
    quantity: number;
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

export type DeliveryMethod = 'warehouse' | 'postomat';
