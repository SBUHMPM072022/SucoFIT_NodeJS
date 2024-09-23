import { CustomRequest } from "../interfaces/ExpressCustomInterface";
import { Response } from "express";
import { ExerciseRecordService } from "../services/ExerciseRecordService";
import { UserService } from "../services/UserService";
import { ExerciseService } from "../services/ExerciseService";

export const ExerciseRecordController = {
    RecordCreate: async(req: CustomRequest, res: Response) => {
        try{
            const { exercise_id, user_id, duration, latitude, longitude, evidence } = req.body;
            const exerciseRecordCreated = await ExerciseRecordService.Create({
                exercise_id,
                user_id,
                duration,
                latitude,
                longitude,
                evidence
            });

            if(!exerciseRecordCreated.result){
                throw {
                    message: exerciseRecordCreated.message,
                    code: "INTERNAL_SERVER_ERROR",
                    statusCode: 500
                }
            };

            const exerciseFound = await ExerciseService.GetExerciseById({ exercise_id });

            const userPointUpdated = await UserService.AddPoint({ point: parseInt(exerciseFound.data.point), user_id: parseInt(user_id) });

            res.status(200).json({ status: 'success', message: exerciseRecordCreated.message, data: exerciseRecordCreated.data });
        }catch(error: any){
            res.status(error.statusCode?error.statusCode: 500).json({ status: 'failed', message: error, data: null });
        }
    }
}