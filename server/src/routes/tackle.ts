import { Request, Response, Router } from 'express';
import {
    createTackle,
    deleteTackle,
    getAllTackles,
    getTackleById,
    updateTackle,
} from '../controllers/tackleController';

type RouterHandler = (req: Request, res: Response) => Promise<Response>;

const router = Router();

router.get('/', getAllTackles);
router.get('/:id', getTackleById);
router.post('/', createTackle);
router.put('/:id', updateTackle);
router.delete('/:id', deleteTackle);

export default router;
