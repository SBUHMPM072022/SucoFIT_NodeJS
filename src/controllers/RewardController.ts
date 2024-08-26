import { CustomRequest } from "../interfaces/ExpressCustomInterface";
import { Response } from "express";
import { ParticipantnService } from "../services/ParticipantService";
import { RewardService } from "../services/RewardService";

export const RewardController = {
    ParticipantCreate: async(req: CustomRequest, res: Response) => {
        try{
            const {
                event_id,
                user_id,
                join_date,
                activity_start,
                activity_stop,
                duration,
                presence_latitude,
                presence_longitude,
                participant_evidence
            } = req.body;

            const participantCreated = await ParticipantnService.Create({
                event_id,
                user_id,
                join_date,
                activity_start,
                activity_stop,
                duration,
                presence_latitude,
                presence_longitude,
                participant_evidence
            })

            if(!participantCreated.result){
                throw {
                    message: participantCreated.message,
                    code: "INTERNAL_SERVER_ERROR",
                    statusCode: 500
                }
            };

            res.status(200).json({ status: 'success', message: participantCreated.message, data: participantCreated.data });
        }catch(error: any){
            res.status(error.statusCode?error.statusCode: 500).json({ status: 'failed', message: error, data: null });
        }
    },
    RewardFindAll: async(req: CustomRequest, res: Response) => {
        try{

            const rewardFound = await RewardService.FindAll();

            if(!rewardFound.result){
                throw {
                    message: rewardFound.message,
                    code: "INTERNAL_SERVER_ERROR",
                    statusCode: 500
                }
            };

            res.status(200).json({ status: 'success', message: rewardFound.message, data: rewardFound.data });
        }catch(error: any){
            res.status(error.statusCode?error.statusCode: 500).json({ status: 'failed', message: error, data: null });
        }
    }
}