import { Router } from 'express';
import {
    createVariantType,
    deleteVariantTypeById,
    getAllVariantTypes,
    getVariantTypeById,
    updateVariantTypeById,
} from '../../controllers/variantTypeController';

const router = Router();

router.get('/', getAllVariantTypes);
router.get('/:id', getVariantTypeById);
router.post('/', createVariantType);
router.put('/:id', updateVariantTypeById);
router.delete('/:id', deleteVariantTypeById);

export default router;
