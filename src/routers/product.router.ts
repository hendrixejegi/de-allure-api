import type { Router as ExpressRouter } from 'express';
import { Router } from 'express';

import {
  createProduct,
  deleteProductById,
  getProductById,
  getProducts,
  updateProductById,
} from '../controllers/product.controller';

const router: ExpressRouter = Router();

router.route('/').post(createProduct).get(getProducts);
router
  .route('/:id')
  .get(getProductById)
  .delete(deleteProductById)
  .patch(updateProductById);

export default router;
