'use client';

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Icon, LeafletMouseEvent, Map } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
    MapContainer,
    MapContainerProps,
    Marker,
    MarkerProps,
    TileLayer,
    TileLayerProps,
} from 'react-leaflet';

const DynamicMapContainer = dynamic<MapContainerProps>(
    () => import('react-leaflet').then((mod) => mod.MapContainer),
    { ssr: false, loading: () => <p>Завантаження карти...</p> },
) as typeof MapContainer;

const DynamicTileLayer = dynamic<TileLayerProps>(
    () => import('react-leaflet').then((mod) => mod.TileLayer),
    { ssr: false },
) as typeof TileLayer;

const DynamicMarker = dynamic<MarkerProps>(
    () => import('react-leaflet').then((mod) => mod.Marker),
    { ssr: false },
) as typeof Marker;

interface Position {
    lat: number;
    lng: number;
}

interface Suggestion {
    place_id: string;
    display_name: string;
    lat: string;
    lon: string;
}

interface LocationSelectorProps {
    selectedLocation: string;
    setSelectedLocation: (location: string) => void;
    markerPosition: Position;
    setMarkerPosition: (position: Position) => void;
}

const LocationSelector = ({
    selectedLocation,
    setSelectedLocation,
    markerPosition,
    setMarkerPosition,
}: LocationSelectorProps) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const mapRef = useRef<Map | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [customIcon, setCustomIcon] = useState<Icon | undefined>(undefined);
    const [useMap, setUseMap] = useState<(() => Map) | null>(null);
    const [useMapEvents, setUseMapEvents] = useState<
        ((handlers: { click: (e: LeafletMouseEvent) => void }) => void) | null
    >(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            import('react-leaflet').then((mod) => {
                setUseMap(() => mod.useMap);
                setUseMapEvents(() => mod.useMapEvents);
            });
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            import('leaflet').then((leaflet) => {
                const icon = new leaflet.Icon({
                    iconUrl:
                        'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
                    iconRetinaUrl:
                        'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
                    shadowUrl:
                        'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41],
                });
                setCustomIcon(icon);
            });
        }
    }, []);

    const geocodeLocation = useCallback(
        async (lat: number, lng: number) => {
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
                    {
                        headers: {
                            'User-Agent':
                                'MyNextApp/1.0 (your-email@example.com)',
                        },
                    },
                );
                const data = await response.json();
                if (data && data.display_name) {
                    setSelectedLocation(data.display_name);
                    setSearchQuery(data.display_name);
                } else {
                    setSelectedLocation('Не вдалося визначити адресу');
                    setSearchQuery('Не вдалося визначити адресу');
                }
            } catch (error) {
                console.error('Помилка геокодування:', error);
                setSelectedLocation('Не вдалося визначити адресу');
                setSearchQuery('Не вдалося визначити адресу');
            }
        },
        [setSelectedLocation],
    );

    const fetchSuggestions = useCallback(async (query: string) => {
        if (query.length < 3) {
            setSuggestions([]);
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=5&countrycodes=ua`,
                {
                    headers: {
                        'User-Agent': 'MyNextApp/1.0 (your-email@example.com)',
                    },
                },
            );
            const data: Suggestion[] = await response.json();
            console.log('Suggestions:', data);
            setSuggestions(data);
        } catch (error) {
            console.error('Помилка при отриманні підказок:', error);
            setSuggestions([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleSuggestionSelect = useCallback(
        (suggestion: Suggestion) => {
            const lat = parseFloat(suggestion.lat);
            const lng = parseFloat(suggestion.lon);
            setMarkerPosition({ lat, lng });
            setSelectedLocation(suggestion.display_name);
            setSearchQuery(suggestion.display_name);
            setSuggestions([]);
            setIsLoading(false);
        },
        [setMarkerPosition, setSelectedLocation],
    );

    const MapController = () => {
        if (!useMap || !useMapEvents) return null;

        const map = useMap();
        mapRef.current = map;

        useMapEvents({
            click(e: LeafletMouseEvent) {
                const { lat, lng } = e.latlng;
                setMarkerPosition({ lat, lng });
                geocodeLocation(lat, lng);
            },
        });

        useEffect(() => {
            if (map) {
                map.setView([markerPosition.lat, markerPosition.lng], 10);
            }
        }, [markerPosition, map]);

        useEffect(() => {
            if (map) {
                setTimeout(() => {
                    map.invalidateSize();
                }, 100);
            }
        }, [map]);

        return null;
    };

    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            fetchSuggestions(value);
        }, 300);
    };

    return (
        <div className="space-y-4">
            <div className="w-full">
                <Input
                    placeholder="Введіть назву міста або адресу"
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="bg-transparent border-white text-white placeholder-gray-500"
                />
                <Command className="bg-black border-white absolute z-50 pr-5 w-[fill-available] md:w-[-webkit-fill-available] lg:w-[-moz-available]">
                    <CommandList>
                        {isLoading ? (
                            <CommandEmpty>Завантаження...</CommandEmpty>
                        ) : suggestions.length > 0 ? (
                            <CommandGroup>
                                {suggestions.map((suggestion) => (
                                    <CommandItem
                                        key={suggestion.place_id}
                                        value={suggestion.display_name}
                                        onSelect={() =>
                                            handleSuggestionSelect(suggestion)
                                        }
                                        className="text-white hover:bg-gray-800"
                                    >
                                        {suggestion.display_name}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        ) : searchQuery.length >= 3 &&
                          searchQuery !== selectedLocation ? (
                            <CommandEmpty>Немає результатів</CommandEmpty>
                        ) : null}
                    </CommandList>
                </Command>
            </div>

            <div className={'relative z-0 h-[400px] w-full'}>
                <DynamicMapContainer
                    center={[markerPosition.lat, markerPosition.lng]}
                    zoom={10}
                    style={{ height: '100%', width: '100%' }}
                >
                    <DynamicTileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {customIcon && (
                        <DynamicMarker
                            position={[markerPosition.lat, markerPosition.lng]}
                            icon={customIcon}
                        />
                    )}
                    <MapController />
                </DynamicMapContainer>
            </div>
        </div>
    );
};

export default LocationSelector;
