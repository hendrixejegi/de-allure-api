import { toNodeHandler } from 'better-auth/node';
import cors, { type CorsOptions } from 'cors';
import express from 'express';

import config from './config';
import { auth } from './lib/auth';
import { checkAuth } from './middlewares/check-auth';
import { errorHandler } from './middlewares/error-handler';
import bucketRouter from './routers/bucket.router';
import productsRouter from './routers/product.router';

const app = express();

const corsOptions: CorsOptions = {
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));

app.all('/api/auth/{*splat}', toNodeHandler(auth)); // Better auth handler

app.use(express.json());
app.use(checkAuth);

// Routers
app.use('/api/bucket', bucketRouter);
app.use('/api/products', productsRouter);
// app.delete('/image', deleteImageFromCloudFlare);

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
