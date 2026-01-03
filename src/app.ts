import express from 'express';
import { errorHandler } from './middlewares/error-handler';
import config from './config/config';

const app = express();

app.use(express.json());

// Routes

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
