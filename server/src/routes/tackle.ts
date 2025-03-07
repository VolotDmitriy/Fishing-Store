import { Request, RequestHandler, Response, Router } from 'express';
import {
    createTackle,
    deleteTackle,
    getAllTackles,
    getTackleById,
    updateTackle,
} from '../controllers/tackleController';

// Тип из контроллера, с явным указанием типов из express
type RouterHandler = (req: Request, res: Response) => Promise<Response>;

// Обёртка для совместимости
const wrapHandler = (handler: RouterHandler): RequestHandler => {
    return async (req, res, next) => {
        try {
            await handler(req, res);
        } catch (error) {
            next(error);
        }
    };
};

const router = Router();

router.get('/', getAllTackles);
router.get('/:id', getTackleById);
router.post('/', createTackle);
router.put('/:id', updateTackle);
router.delete('/:id', deleteTackle);

export default router;
