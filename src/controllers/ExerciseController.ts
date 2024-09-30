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
    },
    GetListExerciseStory: async (req: CustomRequest, res: Response) => {
        try{   
            const getListExerciseStory = await ExerciseService.getListExerciseStory();

            if(!getListExerciseStory.result){
                throw {
                    message: getListExerciseStory.message,
                    code: "INTERNAL_SERVER_ERROR",
                    statusCode: 500
                }
            };

            res.status(200).json({ status: 'success', message: getListExerciseStory.message, data: getListExerciseStory.data });
        }catch(error: any){
            res.status(error.statusCode?error.statusCode: 500).json({ status: 'failed', message: error, data: null });
        }
    },
    GetExerciseStory: async (req: CustomRequest, res: Response) => {
        try{
            const { exercise_name } = req.query;
            const exerciseStoryFound = await ExerciseService.GetExerciseStory({ exercise_name });

            if(!exerciseStoryFound.result){
                throw {
                    message: exerciseStoryFound.message,
                    code: "INTERNAL_SERVER_ERROR",
                    statusCode: 500
                }
            };

            res.status(200).json({ status: 'success', message: exerciseStoryFound.message, data: exerciseStoryFound.data });
        }catch(error: any){
            res.status(error.statusCode?error.statusCode: 500).json({ status: 'failed', message: error, data: null });
        }
    }
}