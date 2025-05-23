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
