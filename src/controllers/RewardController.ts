import { CustomRequest } from "../interfaces/ExpressCustomInterface";
import { Response } from "express";
import { ParticipantnService } from "../services/ParticipantService";
import { RewardService } from "../services/RewardService";

export const RewardController = {
    RewardCreate: async(req: CustomRequest, res: Response) => {
        try{
            const {
                start_date,
                end_date,
                start_rank,
                end_rank
            } = req.body;

            const rewardCreated = await RewardService.Create({
                start_date,
                end_date,
                start_rank,
                end_rank
            })

            if(!rewardCreated.result){
                throw {
                    message: rewardCreated.message,
                    code: "INTERNAL_SERVER_ERROR",
                    statusCode: 500
                }
            };

            res.status(200).json({ status: 'success', message: rewardCreated.message, data: rewardCreated.data });
        }catch(error: any){
            res.status(error.statusCode?error.statusCode: 500).json({ status: 'failed', message: error, data: null });
        }
    },
    RewardUpdate: async(req: CustomRequest, res: Response) => {
        try{
            const { id } = req.params;

            const {
                description,
                prize,
            } = req.body;

            const rewardUpdated = await RewardService.Update({
                description,
                prize
            }, { reward_id: parseInt(id) });

            res.status(200).json({ status: 'success', message: rewardUpdated.message, data: rewardUpdated.data });
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