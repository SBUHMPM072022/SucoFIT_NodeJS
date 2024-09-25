import { CustomRequest } from "../interfaces/ExpressCustomInterface";
import { Response } from "express";
import { ExerciseService } from "../services/ExerciseService";

export const DashboardController = {
    GetTopExercise: async (req: CustomRequest, res: Response) => {
        try{
            const topExerciseFound = await ExerciseService.GetTopExercise();

            if(!topExerciseFound.result){
                throw {
                    message: topExerciseFound.message,
                    code: "INTERNAL_SERVER_ERROR",
                    statusCode: 500
                }
            };

            res.status(200).json({ status: 'success', message: topExerciseFound.message, data: topExerciseFound.data });
        }catch(error: any){
            res.status(error.statusCode?error.statusCode: 500).json({ status: 'failed', message: error, data: null });
        }
    }
}