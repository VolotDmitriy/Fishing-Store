import { Router, Response, Request } from 'express';

const router = Router();
type RouterHandler = (req: Request, res: Response) => void;

interface ITackle {
    id: number;
    title: string;
    price: number;
}

let tackles: ITackle[] = [
    { id: 1, title: 'Спиннинг Daiwa Ninja', price: 5900 },
    { id: 2, title: 'Катушка Shimano Sahara', price: 7500 },
    { id: 3, title: 'Воблер Rapala Countdown', price: 850 },
    { id: 4, title: 'Леска Sunline', price: 450 },
    { id: 5, title: 'Силиконовые приманки YUM', price: 230 },
];

const getAllTackles: RouterHandler = (req, res) => {
    res.json(tackles);
};

const getTackleById: RouterHandler = (req, res) => {
    const id = parseInt(req.params.id);
    const tackle = tackles.find((t) => t.id === id);

    if (tackle) {
        res.json(tackle);
    } else {
        res.status(404).json({ message: 'Снасть не найдена' });
    }
};

const createTackle: RouterHandler = (req, res) => {
    const { title, price } = req.body;

    if (!title || !price) {
        return res
            .status(400)
            .json({ message: 'Необходимо указать название и цену' });
    }

    const newId =
        tackles.length > 0 ? Math.max(...tackles.map((t) => t.id)) + 1 : 1;
    const newTackle: ITackle = { id: newId, title, price };

    tackles.push(newTackle);
    res.status(201).json(newTackle);
};

const updateTackle: RouterHandler = (req, res) => {
    const id = parseInt(req.params.id);
    const { title, price } = req.body;
    const tackleIndex = tackles.findIndex((t) => t.id === id);

    if (tackleIndex === -1) {
        return res.status(404).json({ message: 'Снасть не найдена' });
    }

    tackles[tackleIndex] = {
        ...tackles[tackleIndex],
        title: title !== undefined ? title : tackles[tackleIndex].title,
        price: price !== undefined ? price : tackles[tackleIndex].price,
    };

    res.json(tackles[tackleIndex]);
};

const deleteTackle: RouterHandler = (req, res) => {
    const id = parseInt(req.params.id);
    const tackleIndex = tackles.findIndex((t) => t.id === id);

    if (tackleIndex === -1) {
        return res.status(404).json({ message: 'Снасть не найдена' });
    }

    const deletedTackle = tackles[tackleIndex];
    tackles.splice(tackleIndex, 1);

    res.json({ message: 'Снасть удалена', deletedTackle });
};

router.get('/', getAllTackles);
router.get('/:id', getTackleById);
router.post('/', createTackle);
router.put('/:id', updateTackle);
router.delete('/:id', deleteTackle);

export default router;
