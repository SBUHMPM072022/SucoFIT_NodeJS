import { CustomRequest } from "../interfaces/ExpressCustomInterface";
import { Response } from "express";
import { ExerciseRecordService } from "../services/ExerciseRecordService";

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

            res.status(200).json({ status: 'success', message: exerciseRecordCreated.message, data: exerciseRecordCreated.data });
        }catch(error: any){
            res.status(error.statusCode?error.statusCode: 500).json({ status: 'failed', message: error, data: null });
        }
    }
}