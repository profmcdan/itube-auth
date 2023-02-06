import express, {
  type Application,
  json,
  type NextFunction,
  type Request,
  type Response,
  urlencoded,
} from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app: Application = express();

app.use(cors());
app.use(cors());
app.use(morgan('dev'));
app.use(json());
app.use(urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Auth Service up!!' });
});

app.all('*', (req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.type === 'auth') {
    res.status(401).send({ success: false, detail: 'Unauthorized' });
  } else if (err.type === 'input') {
    res.status(400).send({ success: false, error: 'input errors' });
  } else {
    res.status(500).send({ success: false, error: err.toString() });
  }
});

export default app;
