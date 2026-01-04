import express from 'express';
import { errorHandler } from './middlewares/error-handler';
import config from './config/config';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth';

const app = express();

app.all('/api/auth/*splat', toNodeHandler(auth));

app.use(express.json());

// Routes

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
