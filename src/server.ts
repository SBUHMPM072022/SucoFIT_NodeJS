import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import db from './models';
import cors from 'cors';
import { DatamasterController } from './controllers/DatamasterController';
import { EventController } from './controllers/EventController';
import { ParticipantController } from './controllers/ParticipantController';
import { UserController } from './controllers/UserController';
import { Seeder } from './seeders/Seeder';
import { Seeding } from './utils/helper';
import { RewardController } from './controllers/RewardController';
import { ExerciseController } from './controllers/ExerciseController';
import { storageUploadDocumentv2 } from './controllers/FileController';
import { ExerciseRecordController } from './controllers/ExerciseRecordController';
import { DashboardController } from './controllers/DashboardController';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use('/public',express.static('uploads'));

dotenv.config();

const corsOptions = {
    origin: process.env.FE_URL,
    credentials: true
}
app.use(cors(corsOptions));

// db.sequelize.sync({ alter: true });

// Seeding.Start();

app.listen(process.env.SERVER_PORT, () => console.log(`Server is running in port ${process.env.SERVER_PORT}`));

app.get('/', (req: Request, res: Response) => {
    return res.status(200).send({ message: 'Yay! SucoFIT server is working' });
});

const uploadDocument = multer({ storage: storageUploadDocumentv2 }).fields([
    { name: 'file_photo_evidence', maxCount: 1 },
    { name: 'file_photo_event_evidence', maxCount: 1 },
]);

app.post('/api/v1/web/login', UserController.Login);
app.get('/api/v1/web/logout', UserController.Logout);
app.post('/api/v1/web/register', UserController.UserRegister);
app.delete('/api/v1/web/user/:id', UserController.UserDelete);

app.get('/api/v1/web/leaderboard', UserController.GetLeaderBoard);
app.get('/api/v1/web/activeuser', UserController.GetActiveUser);

app.get('/api/v1/web/division', DatamasterController.DivisionGetAll);
app.post('/api/v1/web/division', DatamasterController.DivisionCreate);
app.delete('/api/v1/web/division/:id', DatamasterController.DivisionDelete);

app.get('/api/v1/web/event-type', DatamasterController.EventTypeGetAll);
app.post('/api/v1/web/event-type', DatamasterController.EventTypeCreate);
app.delete('/api/v1/web/event-type/:id', DatamasterController.EventTypeDelete);

app.get('/api/v1/web/role', DatamasterController.RoleGetAll);
app.post('/api/v1/web/role', DatamasterController.RoleCreate);
app.delete('/api/v1/web/role/:id', DatamasterController.RoleDelete);

app.get('/api/v1/web/event', EventController.EventFindAll);
app.get('/api/v1/web/event/:id', EventController.EventFindById);
app.get('/api/v1/web/event-participation/:user_id', EventController.EventParticipationByUserId);
app.post('/api/v1/web/event', EventController.EventCreate);
app.post('/api/v1/web/join-event', EventController.EventJoin);
app.put('/api/v1/web/event/:id', EventController.EventUpdate);
app.delete('/api/v1/web/event/:id', EventController.EventDelete);

app.get('/api/v1/web/participant', ParticipantController.ParticipantFindAll);
app.put('/api/v1/web/participant/:id', uploadDocument, ParticipantController.ParticipantUpdate);
app.post('/api/v1/web/participant', ParticipantController.ParticipantCreate);
app.delete('/api/v1/web/participant/:id', ParticipantController.ParticipantDelete);

app.get('/api/v1/web/reward', RewardController.RewardFindAll);
app.get('/api/v1/web/reward/:id', RewardController.RewardFindById);
app.put('/api/v1/web/reward/:id', RewardController.RewardUpdate);
app.post('/api/v1/web/reward', RewardController.RewardCreate);

app.get('/api/v1/web/exercise', ExerciseController.GetListExercise);
app.get('/api/v1/web/exercise/story', ExerciseController.GetListExerciseStory);
app.get('/api/v1/web/exercise-story', ExerciseController.GetExerciseStory);
app.post('/api/v1/web/exercise-record', uploadDocument, ExerciseRecordController.RecordCreate);

app.get('/api/v1/web/user/get-point/:user_id', UserController.GetPointByUser);

app.post('/api/v1/mobile/login', UserController.LoginMobile);

app.get('/api/v1/web/dashboard/top-exercise', DashboardController.GetTopExercise);
app.get('/api/v1/web/dashboard/medical-percentage', DashboardController.GetMedicalPercentage);