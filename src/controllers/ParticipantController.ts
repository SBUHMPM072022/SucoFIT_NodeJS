import { CustomRequest } from "../interfaces/ExpressCustomInterface";
import { Response } from "express";
import { ParticipantnService } from "../services/ParticipantService";
import { UserService } from "../services/UserService";

export const ParticipantController = {
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
    ParticipantUpdate: async(req: CustomRequest, res: Response) => {
        try{
            const {
                presence_latitude,
                presence_longitude,
                participation_evidence,
                point,
                user_id
            } = req.body;

            const { id } = req. params;

            const participantUpdated = await ParticipantnService.Update({
                id,
                presence_latitude,
                presence_longitude,
                participation_evidence
            });

            if(!participantUpdated.result){
                throw {
                    message: participantUpdated.message,
                    code: "INTERNAL_SERVER_ERROR",
                    statusCode: 500
                }
            };

            const userPointUpdated = await UserService.AddPoint({ point: parseInt(point), user_id: parseInt(user_id) });

            if(!userPointUpdated.result){
                throw {
                    message: userPointUpdated.message,
                    code: "INTERNAL_SERVER_ERROR",
                    statusCode: 500
                }
            };

            res.status(200).json({ status: 'success', message: participantUpdated.message, data: participantUpdated.data });
        }catch(error: any){
            res.status(error.statusCode?error.statusCode: 500).json({ status: 'failed', message: error, data: null });
        }
    },
    ParticipantFindAll: async(req: CustomRequest, res: Response) => {
        try{
            const { event_id } : any = req.query;

            if(!event_id){
                throw {
                    message: "event id must be mandatory",
                    code: "BAD_REQUEST",
                    statusCode: 400
                }
            }

            const participantFound = await ParticipantnService.FindAll({ id: parseInt(event_id) })

            if(!participantFound.result){
                throw {
                    message: participantFound.message,
                    code: "INTERNAL_SERVER_ERROR",
                    statusCode: 500
                }
            };

            res.status(200).json({ status: 'success', message: participantFound.message, data: participantFound.data });
        }catch(error: any){
            res.status(error.statusCode?error.statusCode: 500).json({ status: 'failed', message: error, data: null });
        }
    },
    ParticipantDelete: async(req: CustomRequest, res: Response) => {
        try{
            const { id } = req.params;

            const participantDeleted = await ParticipantnService.Delete({ id: parseInt(id) });

            if(!participantDeleted.result){
                throw {
                    message: participantDeleted.message,
                    code: "INTERNAL_SERVER_ERROR",
                    statusCode: 500
                }
            };

            res.status(200).json({ status: 'success', message: participantDeleted.message, data: participantDeleted.data });
        }catch(error: any){
            res.status(error.statusCode?error.statusCode: 500).json({ status: 'failed', message: error, data: null });
        }
    }
}