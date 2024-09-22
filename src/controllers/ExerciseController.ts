import { CustomRequest } from "../interfaces/ExpressCustomInterface";
import { Response } from "express";
import { ExerciseService } from "../services/ExerciseService";

export const ExerciseController = {
    GetListExercise: async (req: CustomRequest, res: Response) => {
        try{   
            const { category_name } = req.query;

            const getListExercise = await ExerciseService.getListExercises({ category_name });

            if(!getListExercise.result){
                throw {
                    message: getListExercise.message,
                    code: "INTERNAL_SERVER_ERROR",
                    statusCode: 500
                }
            };

            res.status(200).json({ status: 'success', message: getListExercise.message, data: getListExercise.data });
        }catch(error: any){
            res.status(error.statusCode?error.statusCode: 500).json({ status: 'failed', message: error, data: null });
        }
    }
}