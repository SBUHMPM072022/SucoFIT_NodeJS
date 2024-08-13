import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import db from './models';

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