import { Router } from 'express';
import {
    createProduct,
    deleteProductById,
    getAllProducts,
    getProductByCategory,
    getProductById,
    updateProductById,
} from '../../controllers/productController';
import productAttributeRouter from './productAttributeRouter';
import productVariantAttributeRouter from './productVariantAttributeRouter';
import productVariantRouter from './productVariantRouter';
import variantTypeRouter from './variantTypeRouter';

const router = Router();

router.use('/attribute', productAttributeRouter);
router.use('/variant', productVariantRouter);
router.use('/type', variantTypeRouter);
router.use('/variant_attribute', productVariantAttributeRouter);

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.get('/category/:categoryId', getProductByCategory);
router.post('/', createProduct);
router.put('/:id', updateProductById);
router.delete('/:id', deleteProductById);

export default router;
('localhost:4200/product/category/');
