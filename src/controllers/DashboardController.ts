import { CustomRequest } from "../interfaces/ExpressCustomInterface";
import { Response } from "express";
import { ExerciseService } from "../services/ExerciseService";
import { MedicalRecordService } from "../services/MedicalRecordService";
import { UserController } from "./UserController";
import { UserService } from "../services/UserService";

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
    },
    GetMedicalPercentage: async (req: CustomRequest, res: Response) => {
        try{
            const { medical_type } = req.query;

            if(!medical_type){
                throw {
                    message: "medical_type is mandatory",
                    code: "BAD_REQUEST",
                    statusCode: 400
                }
            };

            const medicalPercentage = await MedicalRecordService.GetMedicalPercentage({ medical_type });

            if(!medicalPercentage.result){
                throw {
                    message: medicalPercentage.message,
                    code: "INTERNAL_SERVER_ERROR",
                    statusCode: 500
                }
            };

            res.status(200).json({ status: 'success', message: medicalPercentage.message, data: medicalPercentage.data });
        }catch(error: any){
            res.status(error.statusCode?error.statusCode: 500).json({ status: 'failed', message: error, data: null });
        }
    },
    GetActivePercentage: async (req: CustomRequest, res: Response) => {
        try{
            const { division } = req.query;

            if(!division){
                throw {
                    message: "division is mandatory",
                    code: "BAD_REQUEST",
                    statusCode: 400
                }
            };

            const activePercentage = await UserService.GetActivityPercentage({ division });

            if(!activePercentage.result){
                throw {
                    message: activePercentage.message,
                    code: "INTERNAL_SERVER_ERROR",
                    statusCode: 500
                }
            };

            res.status(200).json({ status: 'success', message: activePercentage.message, data: activePercentage.data });
        }catch(error: any){
            res.status(error.statusCode?error.statusCode: 500).json({ status: 'failed', message: error, data: null });
        }
    }
}