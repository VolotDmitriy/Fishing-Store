import { Router } from 'express';
import {
    createTackle,
    deleteTackle,
    getAllTackles,
    getTackleById,
    updateTackle,
} from '../controllers/tackleController';

const router = Router();

router.get('/', getAllTackles);
router.get('/:id', getTackleById);
router.post('/', createTackle);
router.put('/:id', updateTackle);
router.delete('/:id', deleteTackle);

export default router;
