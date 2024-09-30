import { CustomRequest } from "../interfaces/ExpressCustomInterface";
import { Response } from "express";
import { ParticipantnService } from "../services/ParticipantService";
import { RewardService } from "../services/RewardService";
import { SpotService } from "../services/SpotService";
import { SpotReviewService } from "../services/SpotReviewService";

export const SpotController = {
    Create: async(req: CustomRequest, res: Response) => {
        try{
            const {
                spot_name,
                spot_photo,
                exercise_id,
                open_hour,
                close_hour,
                contact_number,
                detail_address,
                latitude,
                longitude
            } = req.body;

            const spotCreated = await SpotService.Create({
                spot_name,
                spot_photo,
                exercise_id,
                open_hour,
                close_hour,
                contact_number,
                detail_address,
                latitude,
                longitude
            })

            if(!spotCreated.result){
                throw {
                    message: spotCreated.message,
                    code: "INTERNAL_SERVER_ERROR",
                    statusCode: 500
                }
            };

            res.status(200).json({ status: 'success', message: spotCreated.message, data: spotCreated.data });
        }catch(error: any){
            res.status(error.statusCode?error.statusCode: 500).json({ status: 'failed', message: error, data: null });
        }
    },
    GetListSpot: async(req: CustomRequest, res: Response) => {
        try{

            const spotFound = await SpotService.GetListSpot();    

            if(!spotFound.result){
                throw {
                    message: spotFound.message,
                    code: "INTERNAL_SERVER_ERROR",
                    statusCode: 500
                }
            };

            res.status(200).json({ status: 'success', message: spotFound.message, data: spotFound.data });
        }catch(error: any){
            res.status(error.statusCode?error.statusCode: 500).json({ status: 'failed', message: error, data: null });
        }
    },
    GetSpotById: async(req: CustomRequest, res: Response) => {
        try{

            const { spot_id } = req.params;
            
            const spotFound = await SpotService.GetSpotById(parseInt(spot_id));    

            if(!spotFound.result){
                throw {
                    message: spotFound.message,
                    code: "INTERNAL_SERVER_ERROR",
                    statusCode: 500
                }
            };

            res.status(200).json({ status: 'success', message: spotFound.message, data: spotFound.data });
        }catch(error: any){
            res.status(error.statusCode?error.statusCode: 500).json({ status: 'failed', message: error, data: null });
        }
    },
    CreateReview: async(req: CustomRequest, res: Response) => {
        try{
            const { 
                user_id,
                spot_id,
                comment,
                rating,
             } = req.body;

             const spotReviewCreated = await SpotReviewService.Create({
                user_id,
                spot_id,
                comment,
                rating,
             });

             if(!spotReviewCreated.result){
                throw {
                    message: spotReviewCreated.message,
                    code: "INTERNAL_SERVER_ERROR",
                    statusCode: 500
                }
            };

            res.status(200).json({ status: 'success', message: spotReviewCreated.message, data: spotReviewCreated.data });
        }catch(error: any){
            res.status(error.statusCode?error.statusCode: 500).json({ status: 'failed', message: error, data: null });
        }
    },
    GetListReview: async(req: CustomRequest, res: Response) => {
        try{

            const { spot_id } = req.params;
            
            const spotReviewFound = await SpotReviewService.GetReviewList(parseInt(spot_id));    

            if(!spotReviewFound.result){
                throw {
                    message: spotReviewFound.message,
                    code: "INTERNAL_SERVER_ERROR",
                    statusCode: 500
                }
            };

            res.status(200).json({ status: 'success', message: spotReviewFound.message, data: spotReviewFound.data });
        }catch(error: any){
            res.status(error.statusCode?error.statusCode: 500).json({ status: 'failed', message: error, data: null });
        }
    },
}