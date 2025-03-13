import { Router } from 'express';
import {
    getAllProductVariants,
    getProductVariantById,
    getProductVariantsByProductId,
    createProductVariant,
    updateProductVariantById,
    deleteProductVariantById,
} from '../../controllers/productVariantController';

const router = Router();

router.get('/product_variant', getAllProductVariants);
router.get('/product_variant/:id', getProductVariantById);
router.get('/product_variant/:productId', getProductVariantsByProductId);
router.post('/product_variant', createProductVariant);
router.put('/product_variant/:id', updateProductVariantById);
router.delete('/product_variant/:id', deleteProductVariantById);

export default router;
