import type { Router as ExpressRouter } from 'express';
import { Router } from 'express';

import { uploadImageToR2 } from '../controllers/bucket.controller';
import { checkAuth } from '../middlewares/check-auth';

const router: ExpressRouter = Router();

router.route('/image').post([checkAuth, uploadImageToR2]);

export default router;
