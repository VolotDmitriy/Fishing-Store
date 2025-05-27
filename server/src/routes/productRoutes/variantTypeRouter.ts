import { Router } from 'express';
import {
    createVariantType,
    deleteVariantTypeById,
    getAllVariantTypes,
    getVariantTypeById,
    updateVariantTypeById,
} from '../../controllers/variantTypeController';
import { verifyToken } from '../../middlewares/cookieJwtAuth';

const router = Router();

router.get('/', getAllVariantTypes);
router.get('/:id', getVariantTypeById);
router.post('/', verifyToken, createVariantType);
router.put('/:id', verifyToken, updateVariantTypeById);
router.delete('/:id', verifyToken, deleteVariantTypeById);

export default router;
