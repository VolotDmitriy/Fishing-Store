import { Router } from 'express';
import {
    createProduct,
    deleteProductById,
    getAllProducts,
    getProductByCategory,
    getProductById,
    updateProductById,
} from '../../controllers/productController';
import { verifyToken } from '../../middlewares/cookieJwtAuth';
import productAttributeRouter from './productAttributeRouter';
import productVariantAttributeRouter from './productVariantAttributeRouter';
import productVariantRouter from './productVariantRouter';
import variantTypeRouter from './variantTypeRouter';

const router = Router();

router.use('/attribute', verifyToken, productAttributeRouter);
router.use('/variant', verifyToken, productVariantRouter);
router.use('/type', verifyToken, variantTypeRouter);
router.use('/variant_attribute', verifyToken, productVariantAttributeRouter);

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.get('/category/:categoryId', verifyToken, getProductByCategory);
router.post('/', verifyToken, createProduct);
router.put('/:id', verifyToken, updateProductById);
router.delete('/:id', verifyToken, deleteProductById);

export default router;
('localhost:4200/product/category/');
