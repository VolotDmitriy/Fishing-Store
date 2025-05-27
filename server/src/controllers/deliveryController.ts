import axios from 'axios';
import NodeCache from 'node-cache';
import { RouterHandler } from '../utils/controllerUtils';

const cache = new NodeCache({ stdTTL: 600 }); // Кеш на 10 хвилин
const apiUrl = process.env.NOVA_POSHTA_API_URL;
const apiKey = process.env.NOVA_POSHTA_API_KEY;

const warehouseRefs = {
    warehouse: [
        '6f8c7162-4b72-4b0a-88e5-906948c6a92f', // Поштове відділення з обмеження
        '841339c7-591a-42e2-8233-7a0a00f0ed6f', // Поштове(ий)
    ],
    postomat: [
        'f9316480-5f2d-425d-bc2c-ac7cd29decf0', // Поштомат
    ],
};

export const getNovaPoshtaLocations: RouterHandler = async (req, res) => {
    const { query } = req.body;

    if (!query) {
        res.status(400).json({ error: "Параметр пошуку обов'язковий" });
        return;
    }

    if (!apiUrl || !apiKey) {
        res.status(500).json({
            error: 'Помилка конфігурації: відсутній API URL або ключ',
        });
        return;
    }

    try {
        const response = await axios.post(apiUrl, {
            apiKey,
            modelName: 'Address',
            calledMethod: 'getSettlements',
            methodProperties: {
                FindByString: query,
            },
        });

        if (response.data.success) {
            res.json(response.data.data);
        } else {
            res.status(500).json({
                error: 'Помилка API Нова Пошта',
                details: response.data.errors,
            });
        }
    } catch (error) {
        console.error('Помилка при запиті до Нова Пошта:', error);
        res.status(500).json({ error: 'Помилка сервера' });
    }
};

export const getWarehouses: RouterHandler = async (req, res) => {
    const {
        settlementRef,
        warehouseType,
    }: { settlementRef: string; warehouseType: 'warehouse' | 'postomat' } =
        req.body;

    if (!settlementRef || !warehouseType) {
        res.status(400).json({
            error: 'settlementRef и warehouseType обязательны',
        });
        return;
    }

    const cacheKey = `${settlementRef}_${warehouseType}`;
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
        console.log('Get from cache:', cacheKey);
        res.json(cachedData);
        return;
    }

    if (!apiUrl || !apiKey) {
        res.status(500).json({
            error: 'Ошибка конфигурации: отсутствует API URL или ключ',
        });
        return;
    }

    try {
        const refs = warehouseRefs[warehouseType];
        const promises = refs.map((ref: string) =>
            axios.post(apiUrl, {
                apiKey,
                modelName: 'Address',
                calledMethod: 'getWarehouses',
                methodProperties: {
                    SettlementRef: settlementRef,
                    TypeOfWarehouseRef: ref,
                },
            }),
        );

        const responses = await Promise.all(promises);
        const allWarehouses = responses.flatMap((response: any) => {
            if (response.data.success) {
                return response.data.data;
            } else {
                console.error(
                    `Ошибка API для TypeOfWarehouseRef ${response.config.data}:`,
                    response.data.errors,
                );
                return [];
            }
        });

        if (allWarehouses.length === 0) {
            res.status(404).json({
                error: 'Склады не найдены',
                details: responses
                    .map((r: any) => r.data.errors)
                    .filter(Boolean),
            });
            return;
        }

        cache.set(cacheKey, allWarehouses);
        res.json(allWarehouses);
    } catch (error) {
        console.error('Ошибка при запросе к Нова Пошта:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
};
