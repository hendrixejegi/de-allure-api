import type { Router as ExpressRouter } from 'express';
import { Router } from 'express';

import { createProduct } from '../controllers/product.controller';
import { checkAuth } from '../middlewares/check-auth';

const router: ExpressRouter = Router();

router.route('/').post([checkAuth, createProduct]);

export default router;
