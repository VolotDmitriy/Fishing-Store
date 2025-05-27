import { Router } from 'express';
import {
    createProductVariant,
    deleteProductVariantById,
    getAllProductVariants,
    getProductVariantById,
    getProductVariantsByProductId,
    updateProductVariantById,
} from '../../controllers/productVariantController';

const router = Router();

router.get('/', getAllProductVariants);
router.get('/:id', getProductVariantById);
router.get('/product/:productId', getProductVariantsByProductId);
router.post('/', createProductVariant);
router.put('/:id', updateProductVariantById);
router.delete('/:id', deleteProductVariantById);

export default router;
