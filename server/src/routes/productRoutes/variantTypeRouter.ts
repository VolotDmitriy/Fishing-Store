import { Router } from 'express';
import {
    deleteVariantTypeById,
    getAllVariantTypes,
    getVariantTypeById,
    createVariantType,
    updateVariantTypeById,
} from '../../controllers/variantTypeController';

const router = Router();

router.get('/variant_type', getAllVariantTypes);
router.get('/variant_type/:id', getVariantTypeById);
router.post('/variant_type', createVariantType);
router.put('/variant_type/:id', updateVariantTypeById);
router.delete('/variant_type/:id', deleteVariantTypeById);

export default router;
