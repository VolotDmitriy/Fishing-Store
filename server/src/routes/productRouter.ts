import { Router } from 'express';
import {
    getAllVariantTypes,
    getVariantTypeById,
    createVariantType,
    updateVariantTypeById,
    deleteVariantTypeById,
} from '../controllers/productController';

const router = Router();

router.get('/variant_type', getAllVariantTypes);
router.get('/variant_type/:id', getVariantTypeById);
router.post('/variant_type', createVariantType);
router.put('/variant_type/:id', updateVariantTypeById);
router.delete('/variant_type/:id', deleteVariantTypeById);

export default router;
