import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import db from './models';
import { DatamasterController } from './controllers/DatamasterController';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public',express.static('uploads'));

dotenv.config();

// db.sequelize.sync({ alter: true });

app.listen(process.env.SERVER_PORT, () => console.log(`Server is running in port ${process.env.SERVER_PORT}`));

app.get('/', (req: Request, res: Response) => {
    return res.status(200).send({ message: 'Yay! SucoFIT server is working' });
});

app.get('/api/v1/web/division', DatamasterController.DivisionGetAll);
app.post('/api/v1/web/division', DatamasterController.DivisionCreate);
app.delete('/api/v1/web/division/:id', DatamasterController.DivisionDelete);
