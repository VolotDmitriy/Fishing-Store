import { Router } from 'express';
import {
    getAllProductVariantAttributes,
    getProductVariantAttributeById,
    getProductVariantAttributeByVariantId,
    createProductVariantAttribute,
    updateProductVariantAttributeById,
    deleteProductVariantAttributeById,
} from '../../controllers/productVariantAttributeController';

const router = Router();

router.get('/product_variant_attribute', getAllProductVariantAttributes);
router.get('/product_variant_attribute/:id', getProductVariantAttributeById);
router.get(
    '/product_variant_attribute/:variantId',
    getProductVariantAttributeByVariantId,
);
router.post('/product_variant_attribute', createProductVariantAttribute);
router.put('/product_variant_attribute/:id', updateProductVariantAttributeById);
router.delete(
    '/product_variant_attribute/:id',
    deleteProductVariantAttributeById,
);

export default router;
