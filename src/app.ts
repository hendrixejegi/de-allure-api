import express, { type Request, type Response } from 'express';
import { errorHandler } from './middlewares/error-handler';
import config from './config/config';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth';
import cors, { type CorsOptions } from 'cors';

const app = express();

const corsOptions: CorsOptions = {
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));

app.all('/api/auth/{*splat}', toNodeHandler(auth)); // Better auth handler

app.use(express.json());

// Routes

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
