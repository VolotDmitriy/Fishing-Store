'use client';

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { fetchSettlements } from '@/utils/requests'; // Імпортуємо нову функцію
import { LocationData, Position, Settlement } from '@/utils/types';
import { Icon, Map } from 'leaflet';
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
    useMap,
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

interface LocationSelectorProps {
    locationData: LocationData;
    setLocationData: (data: LocationData) => void;
    markerPosition: Position;
    setMarkerPosition: (position: Position) => void;
}

const LocationSelector = ({
    locationData,
    setLocationData,
    markerPosition,
    setMarkerPosition,
}: LocationSelectorProps) => {
    const [searchQuery, setSearchQuery] = useState<string>(
        locationData.display_name || '',
    );
    const [suggestions, setSuggestions] = useState<LocationData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const mapRef = useRef<Map | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [customIcon, setCustomIcon] = useState<Icon | undefined>(undefined);

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

    useEffect(() => {
        if (locationData && locationData.display_name) {
            setSearchQuery(locationData.display_name);
        }
    }, [locationData]);

    const isCyrillic = (text: string) => {
        return /^[\u0400-\u04FF\s\-0-9]*$/.test(text);
    };

    const fetchSuggestions = useCallback(async (query: string) => {
        if (query.length < 3) {
            setSuggestions([]);
            setError(null);
            setIsLoading(false);
            return;
        }

        if (!isCyrillic(query)) {
            setError(
                'Використовуйте кирилицю для пошуку (наприклад, Київ або Киев)',
            );
            setSuggestions([]);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const settlements = await fetchSettlements(query);
            const formattedSuggestions = settlements.map(
                (settlement: Settlement) => ({
                    settlement,
                    display_name: `${settlement.SettlementTypeDescription}, ${settlement.Description}, ${settlement.AreaDescription} обл.${
                        settlement.RegionsDescription !== ''
                            ? `, (${settlement.RegionsDescription} р-н)`
                            : ''
                    }`,
                    lat: settlement.Latitude,
                    lon: settlement.Longitude,
                }),
            );
            setSuggestions(formattedSuggestions);
        } catch (error) {
            setError('Помилка сервера. Спробуйте ще раз.');
            setSuggestions([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleSuggestionSelect = useCallback(
        (suggestion: LocationData) => {
            const lat = parseFloat(suggestion.lat);
            const lng = parseFloat(suggestion.lon);
            setMarkerPosition({ lat, lng });
            setLocationData(suggestion);
            setSearchQuery(suggestion.display_name);
            setSuggestions([]);
            setError(null);
        },
        [setMarkerPosition, setLocationData],
    );

    const MapController = () => {
        const map = useMap();
        mapRef.current = map;

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
                    placeholder="Введіть назву міста"
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="bg-transparent border-white text-white placeholder-gray-500"
                />

                {(isLoading || suggestions.length > 0 || error) && (
                    <Command className="bg-black border-white absolute z-50 pr-5 w-[fill-available] md:w-[-webkit-fill-available] lg:w-[-moz-available]">
                        <CommandList>
                            {isLoading ? (
                                <CommandEmpty>Завантаження...</CommandEmpty>
                            ) : error ? (
                                <CommandEmpty>{error}</CommandEmpty>
                            ) : suggestions.length > 0 ? (
                                <CommandGroup>
                                    {suggestions.map((suggestion) => (
                                        <CommandItem
                                            key={suggestion.settlement.Ref}
                                            value={suggestion.display_name}
                                            onSelect={() =>
                                                handleSuggestionSelect(
                                                    suggestion,
                                                )
                                            }
                                            className="text-white hover:bg-gray-800"
                                        >
                                            {suggestion.display_name}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            ) : searchQuery.length >= 3 &&
                              searchQuery !== locationData.display_name ? (
                                <CommandEmpty>
                                    Немає результатів. Спробуйте ввести назву
                                    міста кирилицею.
                                </CommandEmpty>
                            ) : null}
                        </CommandList>
                    </Command>
                )}
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
