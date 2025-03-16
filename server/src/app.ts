import express, { Application } from 'express';
import router from './routes';
import { logger } from './utils/logger';

const app: Application = express();

app.use(logger);

app.use(express.json());
app.use('/', router);

export default app;
