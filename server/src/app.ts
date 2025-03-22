import cors, { CorsOptions } from 'cors';
import express, { Application } from 'express';
import router from './routes';
import { logger } from './utils/logger';

const app: Application = express();

app.use(logger);

const corsOptions: CorsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:3001'], // Разрешённый домен
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Разрешённые методы
    allowedHeaders: ['Content-Type', 'Authorization'], // Разрешённые заголовки
    credentials: true, // Разрешение куки
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use('/', router);

export default app;
