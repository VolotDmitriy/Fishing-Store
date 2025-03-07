import {
    Category,
    Discount,
    Product,
    ProductAttribute,
    ProductVariant,
    VariantType,
} from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export const categories: Category[] = [
    { id: 'cat001', name: 'Удочки', parentId: null },
    { id: 'cat002', name: 'Спиннинги', parentId: 'cat001' },
    { id: 'cat003', name: 'Фидерные удочки', parentId: 'cat001' },
    { id: 'cat004', name: 'Катушки', parentId: null },
    {
        id: 'cat005',
        name: 'Безынерционные катушки',
        parentId: 'cat004',
    },
    { id: 'cat006', name: 'Приманки', parentId: null },
    { id: 'cat007', name: 'Воблеры', parentId: 'cat006' },
    { id: 'cat008', name: 'Леска', parentId: null },
    { id: 'cat009', name: 'Крючки', parentId: null },
    { id: 'cat010', name: 'Снаряжение', parentId: null },
];

export const variantTypes: VariantType[] = [
    { id: 'vt001', categoryId: 'cat001', name: 'Длина' },
    { id: 'vt002', categoryId: 'cat001', name: 'Тест' },
    { id: 'vt003', categoryId: 'cat001', name: 'Материал' },
    { id: 'vt004', categoryId: 'cat004', name: 'Размер' },
    { id: 'vt005', categoryId: 'cat006', name: 'Цвет' },
    { id: 'vt006', categoryId: 'cat008', name: 'Диаметр' },
    { id: 'vt007', categoryId: 'cat009', name: 'Размер крючка' },
    { id: 'vt008', categoryId: 'cat010', name: 'Тип' },
];

export const discounts: Discount[] = [
    {
        id: 'disc001',
        name: 'Осенняя распродажа',
        percentage: 15.0,
        startDate: new Date('2025-09-01T00:00:00.000Z'),
        endDate: new Date('2025-09-30T23:59:59.999Z'),
    },
];

const prodAttr: ProductAttribute[] = [
    {
        id: 'prodAttr001',
        productId: 'vt001',
        value: '200',
        typeId: '123',
    },
];

const prodVar: ProductVariant[] = [
    {
        id: 'prodVar001',
        productId: 'prod001',
        sku: 'SH-NX-240',
        price: new Decimal(5000),
        inStock: 10,
        discountId: 'disc001',
    },
];

const prod: Product[] = [
    {
        id: 'prod001',
        name: 'Удочка Shimano BeastMaster',
        description: 'Профессиональная удочка для дальнего заброса.',
        categoryId: 'cat001',
        images: ['https://example.com/shimano_beastmaster.jpg'],
        discountId: 'disc001',
    },
];

export const spinningRods = [
    {
        id: 'prod001',
        name: 'Спиннинг Shimano Nexave 240',
        categoryId: 'cat002',
        description: 'Легкий спиннинг.',
        images: ['img1.jpg'],
        discountId: 'disc001',
        variants: [
            {
                sku: 'SH-NX-240',
                price: 5000,
                inStock: 10,
                attrs: [
                    { typeId: 'vt001', value: '2.4 м' },
                    { typeId: 'vt002', value: '10-30 г' },
                ],
            },
        ],
    },
    {
        id: 'prod002',
        name: 'Спиннинг Daiwa Exceler 270',
        categoryId: 'cat002',
        description: 'Прочный спиннинг.',
        images: ['img2.jpg'],
        variants: [
            {
                sku: 'DW-EX-270',
                price: 6000,
                inStock: 8,
                attrs: [
                    { typeId: 'vt001', value: '2.7 м' },
                    { typeId: 'vt002', value: '15-40 г' },
                ],
            },
        ],
    },
    {
        id: 'prod003',
        name: 'Спиннинг Abu Garcia 210',
        categoryId: 'cat002',
        description: 'Компактный спиннинг.',
        images: ['img3.jpg'],
        variants: [
            {
                sku: 'AG-210',
                price: 4500,
                inStock: 12,
                attrs: [
                    { typeId: 'vt001', value: '2.1 м' },
                    { typeId: 'vt002', value: '5-20 г' },
                ],
            },
        ],
    },
    {
        id: 'prod004',
        name: 'Спиннинг Okuma Ceymar 300',
        categoryId: 'cat002',
        description: 'Мощный спиннинг.',
        images: ['img4.jpg'],
        variants: [
            {
                sku: 'OK-CEY-300',
                price: 7000,
                inStock: 5,
                attrs: [
                    { typeId: 'vt001', value: '3.0 м' },
                    { typeId: 'vt002', value: '20-50 г' },
                ],
            },
        ],
    },
    {
        id: 'prod005',
        name: 'Спиннинг Salmo Elite 240',
        categoryId: 'cat002',
        description: 'Универсальный спиннинг.',
        images: ['img5.jpg'],
        variants: [
            {
                sku: 'SAL-EL-240',
                price: 5200,
                inStock: 15,
                attrs: [
                    { typeId: 'vt001', value: '2.4 м' },
                    { typeId: 'vt002', value: '10-35 г' },
                ],
            },
        ],
    },
    {
        id: 'prod006',
        name: 'Спиннинг Berkley Pulse 270',
        categoryId: 'cat002',
        description: 'Чувствительный спиннинг.',
        images: ['img6.jpg'],
        variants: [
            {
                sku: 'BER-PUL-270',
                price: 5800,
                inStock: 9,
                attrs: [
                    { typeId: 'vt001', value: '2.7 м' },
                    { typeId: 'vt002', value: '15-45 г' },
                ],
            },
        ],
    },
    {
        id: 'prod007',
        name: 'Спиннинг St. Croix 210',
        categoryId: 'cat002',
        description: 'Легкий и прочный.',
        images: ['img7.jpg'],
        variants: [
            {
                sku: 'STC-210',
                price: 6500,
                inStock: 7,
                attrs: [
                    { typeId: 'vt001', value: '2.1 м' },
                    { typeId: 'vt002', value: '5-25 г' },
                ],
            },
        ],
    },
    {
        id: 'prod008',
        name: 'Спиннинг Fenwick 240',
        categoryId: 'cat002',
        description: 'Для дальнего заброса.',
        images: ['img8.jpg'],
        variants: [
            {
                sku: 'FEN-240',
                price: 6200,
                inStock: 6,
                attrs: [
                    { typeId: 'vt001', value: '2.4 м' },
                    { typeId: 'vt002', value: '10-40 г' },
                ],
            },
        ],
    },
    {
        id: 'prod009',
        name: 'Спиннинг PENN Battle 270',
        categoryId: 'cat002',
        description: 'Для тяжелых приманок.',
        images: ['img9.jpg'],
        variants: [
            {
                sku: 'PEN-BAT-270',
                price: 7500,
                inStock: 4,
                attrs: [
                    { typeId: 'vt001', value: '2.7 м' },
                    { typeId: 'vt002', value: '20-60 г' },
                ],
            },
        ],
    },
    {
        id: 'prod010',
        name: 'Спиннинг KastKing 300',
        categoryId: 'cat002',
        description: 'Бюджетный спиннинг.',
        images: ['img10.jpg'],
        variants: [
            {
                sku: 'KAST-300',
                price: 4800,
                inStock: 20,
                attrs: [
                    { typeId: 'vt001', value: '3.0 м' },
                    { typeId: 'vt002', value: '15-50 г' },
                ],
            },
        ],
    },
];

export const feederRods = [
    {
        id: 'prod011',
        name: 'Фидер Shimano Beastmaster 360',
        categoryId: 'cat003',
        description: 'Для фидерной ловли.',
        images: ['img11.jpg'],
        variants: [
            {
                sku: 'SH-BM-360',
                price: 8000,
                inStock: 7,
                attrs: [
                    { typeId: 'vt001', value: '3.6 м' },
                    { typeId: 'vt002', value: '80 г' },
                ],
            },
        ],
    },
    {
        id: 'prod012',
        name: 'Фидер Daiwa Windcast 390',
        categoryId: 'cat003',
        description: 'Мощный фидер.',
        images: ['img12.jpg'],
        variants: [
            {
                sku: 'DW-WC-390',
                price: 8500,
                inStock: 5,
                attrs: [
                    { typeId: 'vt001', value: '3.9 м' },
                    { typeId: 'vt002', value: '100 г' },
                ],
            },
        ],
    },
    {
        id: 'prod013',
        name: 'Фидер Salmo Diamond 330',
        categoryId: 'cat003',
        description: 'Легкий фидер.',
        images: ['img13.jpg'],
        variants: [
            {
                sku: 'SAL-DM-330',
                price: 7000,
                inStock: 8,
                attrs: [
                    { typeId: 'vt001', value: '3.3 м' },
                    { typeId: 'vt002', value: '60 г' },
                ],
            },
        ],
    },
    {
        id: 'prod014',
        name: 'Фидер Browning 360',
        categoryId: 'cat003',
        description: 'Универсальный фидер.',
        images: ['img14.jpg'],
        variants: [
            {
                sku: 'BR-360',
                price: 7200,
                inStock: 6,
                attrs: [
                    { typeId: 'vt001', value: '3.6 м' },
                    { typeId: 'vt002', value: '70 г' },
                ],
            },
        ],
    },
    {
        id: 'prod015',
        name: 'Фидер Preston 390',
        categoryId: 'cat003',
        description: 'Для дальнего заброса.',
        images: ['img15.jpg'],
        variants: [
            {
                sku: 'PRES-390',
                price: 9000,
                inStock: 4,
                attrs: [
                    { typeId: 'vt001', value: '3.9 м' },
                    { typeId: 'vt002', value: '120 г' },
                ],
            },
        ],
    },
];

export const coils = [
    {
        id: 'prod016',
        name: 'Катушка Daiwa Ninja 3000',
        categoryId: 'cat005',
        description: 'Бюджетная катушка.',
        images: ['img16.jpg'],
        variants: [
            {
                sku: 'DW-NJ-3000',
                price: 3000,
                inStock: 20,
                attrs: [{ typeId: 'vt004', value: '3000' }],
            },
        ],
    },
    {
        id: 'prod017',
        name: 'Катушка Shimano Catana 2500',
        categoryId: 'cat005',
        description: 'Надежная катушка.',
        images: ['img17.jpg'],
        variants: [
            {
                sku: 'SH-CA-2500',
                price: 3500,
                inStock: 15,
                attrs: [{ typeId: 'vt004', value: '2500' }],
            },
        ],
    },
    {
        id: 'prod018',
        name: 'Катушка Okuma Avenger 4000',
        categoryId: 'cat005',
        description: 'Мощная катушка.',
        images: ['img18.jpg'],
        variants: [
            {
                sku: 'OK-AV-4000',
                price: 4000,
                inStock: 10,
                attrs: [{ typeId: 'vt004', value: '4000' }],
            },
        ],
    },
    {
        id: 'prod019',
        name: 'Катушка Ryobi Excia 2000',
        categoryId: 'cat005',
        description: 'Легкая катушка.',
        images: ['img19.jpg'],
        variants: [
            {
                sku: 'RY-EX-2000',
                price: 3200,
                inStock: 12,
                attrs: [{ typeId: 'vt004', value: '2000' }],
            },
        ],
    },
    {
        id: 'prod020',
        name: 'Катушка PENN Spinfisher 3500',
        categoryId: 'cat005',
        description: 'Для тяжелых нагрузок.',
        images: ['img20.jpg'],
        variants: [
            {
                sku: 'PEN-SF-3500',
                price: 5000,
                inStock: 8,
                attrs: [{ typeId: 'vt004', value: '3500' }],
            },
        ],
    },
    {
        id: 'prod021',
        name: 'Катушка Abu Garcia Revo 3000',
        categoryId: 'cat005',
        description: 'Прочная катушка.',
        images: ['img21.jpg'],
        variants: [
            {
                sku: 'AG-RE-3000',
                price: 4500,
                inStock: 9,
                attrs: [{ typeId: 'vt004', value: '3000' }],
            },
        ],
    },
    {
        id: 'prod022',
        name: 'Катушка Salmo Sniper 2000',
        categoryId: 'cat005',
        description: 'Бюджетная модель.',
        images: ['img22.jpg'],
        variants: [
            {
                sku: 'SAL-SN-2000',
                price: 2800,
                inStock: 25,
                attrs: [{ typeId: 'vt004', value: '2000' }],
            },
        ],
    },
    {
        id: 'prod023',
        name: 'Катушка KastKing Sharky 4000',
        categoryId: 'cat005',
        description: 'Для дальнего заброса.',
        images: ['img23.jpg'],
        variants: [
            {
                sku: 'KAST-SH-4000',
                price: 4200,
                inStock: 10,
                attrs: [{ typeId: 'vt004', value: '4000' }],
            },
        ],
    },
    {
        id: 'prod024',
        name: 'Катушка St. Croix 2500',
        categoryId: 'cat005',
        description: 'Легкая и прочная.',
        images: ['img24.jpg'],
        variants: [
            {
                sku: 'STC-2500',
                price: 3800,
                inStock: 12,
                attrs: [{ typeId: 'vt004', value: '2500' }],
            },
        ],
    },
    {
        id: 'prod025',
        name: 'Катушка Fenwick Elite 3000',
        categoryId: 'cat005',
        description: 'Универсальная катушка.',
        images: ['img25.jpg'],
        variants: [
            {
                sku: 'FEN-EL-3000',
                price: 4600,
                inStock: 7,
                attrs: [{ typeId: 'vt004', value: '3000' }],
            },
        ],
    },
];

export const wobblers = [
    {
        id: 'prod026',
        name: 'Воблер Rapala Original 5',
        categoryId: 'cat007',
        description: 'Классический воблер.',
        images: ['img26.jpg'],
        discountId: 'disc001',
        variants: [
            {
                sku: 'RAP-OR-5',
                price: 600,
                inStock: 30,
                attrs: [{ typeId: 'vt005', value: 'Серебристый' }],
            },
        ],
    },
    {
        id: 'prod027',
        name: 'Воблер Yo-Zuri Crystal 7',
        categoryId: 'cat007',
        description: 'Яркий воблер.',
        images: ['img27.jpg'],
        variants: [
            {
                sku: 'YZ-CR-7',
                price: 650,
                inStock: 25,
                attrs: [{ typeId: 'vt005', value: 'Золотой' }],
            },
        ],
    },
    {
        id: 'prod028',
        name: 'Воблер Salmo Hornet 4',
        categoryId: 'cat007',
        description: 'Для щуки.',
        images: ['img28.jpg'],
        variants: [
            {
                sku: 'SAL-HOR-4',
                price: 550,
                inStock: 20,
                attrs: [{ typeId: 'vt005', value: 'Зеленый' }],
            },
        ],
    },
    {
        id: 'prod029',
        name: 'Воблер Strike Pro 6',
        categoryId: 'cat007',
        description: 'Плавающий воблер.',
        images: ['img29.jpg'],
        variants: [
            {
                sku: 'SP-6',
                price: 500,
                inStock: 35,
                attrs: [{ typeId: 'vt005', value: 'Красный' }],
            },
        ],
    },
    {
        id: 'prod030',
        name: 'Воблер Bomber Fat 5',
        categoryId: 'cat007',
        description: 'Для окуня.',
        images: ['img30.jpg'],
        variants: [
            {
                sku: 'BOM-FT-5',
                price: 580,
                inStock: 22,
                attrs: [{ typeId: 'vt005', value: 'Черный' }],
            },
        ],
    },
    {
        id: 'prod031',
        name: 'Воблер Pontoon 21 7',
        categoryId: 'cat007',
        description: 'Глубоководный воблер.',
        images: ['img31.jpg'],
        variants: [
            {
                sku: 'P21-7',
                price: 700,
                inStock: 15,
                attrs: [{ typeId: 'vt005', value: 'Синий' }],
            },
        ],
    },
    {
        id: 'prod032',
        name: 'Воблер Lucky Craft 5',
        categoryId: 'cat007',
        description: 'Для судака.',
        images: ['img32.jpg'],
        variants: [
            {
                sku: 'LC-5',
                price: 620,
                inStock: 18,
                attrs: [{ typeId: 'vt005', value: 'Белый' }],
            },
        ],
    },
    {
        id: 'prod033',
        name: 'Воблер Megabass Vision 6',
        categoryId: 'cat007',
        description: 'Премиум воблер.',
        images: ['img33.jpg'],
        variants: [
            {
                sku: 'MB-VS-6',
                price: 800,
                inStock: 10,
                attrs: [{ typeId: 'vt005', value: 'Оранжевый' }],
            },
        ],
    },
    {
        id: 'prod034',
        name: 'Воблер Duo Realis 5',
        categoryId: 'cat007',
        description: 'Реалистичный воблер.',
        images: ['img34.jpg'],
        variants: [
            {
                sku: 'DUO-RE-5',
                price: 650,
                inStock: 20,
                attrs: [{ typeId: 'vt005', value: 'Серый' }],
            },
        ],
    },
    {
        id: 'prod035',
        name: 'Воблер Bandit 4',
        categoryId: 'cat007',
        description: 'Для троллинга.',
        images: ['img35.jpg'],
        variants: [
            {
                sku: 'BAN-4',
                price: 600,
                inStock: 25,
                attrs: [{ typeId: 'vt005', value: 'Желтый' }],
            },
        ],
    },
];

export const fishingLine = [
    {
        id: 'prod036',
        name: 'Леска Berkley Trilene 0.25',
        categoryId: 'cat008',
        description: 'Прочная леска.',
        images: ['img36.jpg'],
        variants: [
            {
                sku: 'BER-TR-025',
                price: 200,
                inStock: 50,
                attrs: [{ typeId: 'vt006', value: '0.25 мм' }],
            },
        ],
    },
    {
        id: 'prod037',
        name: 'Леска Shimano Aspire 0.30',
        categoryId: 'cat008',
        description: 'Для тяжелых нагрузок.',
        images: ['img37.jpg'],
        variants: [
            {
                sku: 'SH-AS-030',
                price: 250,
                inStock: 40,
                attrs: [{ typeId: 'vt006', value: '0.30 мм' }],
            },
        ],
    },
    {
        id: 'prod038',
        name: 'Леска Sufix Advance 0.20',
        categoryId: 'cat008',
        description: 'Тонкая леска.',
        images: ['img38.jpg'],
        variants: [
            {
                sku: 'SUF-AD-020',
                price: 180,
                inStock: 60,
                attrs: [{ typeId: 'vt006', value: '0.20 мм' }],
            },
        ],
    },
    {
        id: 'prod039',
        name: 'Леска Daiwa J-Braid 0.28',
        categoryId: 'cat008',
        description: 'Плетеная леска.',
        images: ['img39.jpg'],
        variants: [
            {
                sku: 'DW-JB-028',
                price: 300,
                inStock: 30,
                attrs: [{ typeId: 'vt006', value: '0.28 мм' }],
            },
        ],
    },
    {
        id: 'prod040',
        name: 'Леска Power Pro 0.32',
        categoryId: 'cat008',
        description: 'Сверхпрочная леска.',
        images: ['img40.jpg'],
        variants: [
            {
                sku: 'PP-032',
                price: 350,
                inStock: 25,
                attrs: [{ typeId: 'vt006', value: '0.32 мм' }],
            },
        ],
    },
];

export const hooks = [
    {
        id: 'prod041',
        name: 'Крючки Owner Mosquito #2',
        categoryId: 'cat009',
        description: 'Острые крючки.',
        images: ['img41.jpg'],
        variants: [
            {
                sku: 'OWN-MOS-2',
                price: 150,
                inStock: 100,
                attrs: [{ typeId: 'vt007', value: '#2' }],
            },
        ],
    },
    {
        id: 'prod042',
        name: 'Крючки Gamakatsu LS-531 #4',
        categoryId: 'cat009',
        description: 'Для крупной рыбы.',
        images: ['img42.jpg'],
        variants: [
            {
                sku: 'GAM-LS-4',
                price: 180,
                inStock: 80,
                attrs: [{ typeId: 'vt007', value: '#4' }],
            },
        ],
    },
    {
        id: 'prod043',
        name: 'Крючки Mustad Classic #6',
        categoryId: 'cat009',
        description: 'Универсальные крючки.',
        images: ['img43.jpg'],
        variants: [
            {
                sku: 'MUS-CL-6',
                price: 120,
                inStock: 120,
                attrs: [{ typeId: 'vt007', value: '#6' }],
            },
        ],
    },
    {
        id: 'prod044',
        name: 'Крючки Hayabusa 531 #3',
        categoryId: 'cat009',
        description: 'Для приманок.',
        images: ['img44.jpg'],
        variants: [
            {
                sku: 'HAY-531-3',
                price: 160,
                inStock: 90,
                attrs: [{ typeId: 'vt007', value: '#3' }],
            },
        ],
    },
    {
        id: 'prod045',
        name: 'Крючки VMC 7545 #5',
        categoryId: 'cat009',
        description: 'Прочные крючки.',
        images: ['img45.jpg'],
        variants: [
            {
                sku: 'VMC-7545-5',
                price: 140,
                inStock: 110,
                attrs: [{ typeId: 'vt007', value: '#5' }],
            },
        ],
    },
];

export const equipment = [
    {
        id: 'prod046',
        name: 'Ящик Plano 3600',
        categoryId: 'cat010',
        description: 'Для снастей.',
        images: ['img46.jpg'],
        discountId: 'disc001',
        variants: [
            {
                sku: 'PLA-3600',
                price: 1200,
                inStock: 15,
                attrs: [{ typeId: 'vt008', value: 'Ящик' }],
            },
        ],
    },
    {
        id: 'prod047',
        name: 'Подставка Shimano Rod Rest',
        categoryId: 'cat010',
        description: 'Для удочек.',
        images: ['img47.jpg'],
        variants: [
            {
                sku: 'SH-RR',
                price: 800,
                inStock: 20,
                attrs: [{ typeId: 'vt008', value: 'Подставка' }],
            },
        ],
    },
    {
        id: 'prod048',
        name: 'Сигнализатор Daiwa Bite',
        categoryId: 'cat010',
        description: 'Электронный сигнализатор.',
        images: ['img48.jpg'],
        variants: [
            {
                sku: 'DW-BITE',
                price: 1500,
                inStock: 10,
                attrs: [{ typeId: 'vt008', value: 'Сигнализатор' }],
            },
        ],
    },
    {
        id: 'prod049',
        name: 'Сумка Salmo Tackle',
        categoryId: 'cat010',
        description: 'Для переноски.',
        images: ['img49.jpg'],
        variants: [
            {
                sku: 'SAL-TK',
                price: 2000,
                inStock: 8,
                attrs: [{ typeId: 'vt008', value: 'Сумка' }],
            },
        ],
    },
    {
        id: 'prod050',
        name: 'Эхолот Lucky FF1108',
        categoryId: 'cat010',
        description: 'Для поиска рыбы.',
        images: ['img50.jpg'],
        variants: [
            {
                sku: 'LKY-FF1108',
                price: 5000,
                inStock: 5,
                attrs: [{ typeId: 'vt008', value: 'Эхолот' }],
            },
        ],
    },
];
