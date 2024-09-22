import { CustomRequest } from "../interfaces/ExpressCustomInterface";
import { Response } from "express";
import { DivisionService } from "../services/DivisionService";
import { EventService } from "../services/EventService";
import { ParticipantnService } from "../services/ParticipantService";

export const EventController = {
    EventCreate: async(req: CustomRequest, res: Response) => {
        try{
            const {
                event_name,
                event_description,
                event_type_id,
                pic,
                location,
                latitude,
                longitude,
                registration_start_date,
                registration_end_date,
                event_start_date,
                event_end_date,
                point
            } = req.body;

            const eventCreated = await EventService.Create({
                event_name,
                event_description,
                event_type_id,
                pic,
                location,
                latitude,
                longitude,
                registration_start_date,
                registration_end_date,
                event_start_date,
                event_end_date,
                point
            })

            if(!eventCreated.result){
                throw {
                    message: eventCreated.message,
                    code: "INTERNAL_SERVER_ERROR",
                    statusCode: 500
                }
            };

            res.status(200).json({ status: 'success', message: eventCreated.message, data: eventCreated.data });
        }catch(error: any){
            res.status(error.statusCode?error.statusCode: 500).json({ status: 'failed', message: error, data: null });
        }
    },
    EventUpdate: async(req: CustomRequest, res: Response) => {
        try{
            const { id } : any = req.params;
            const {
                event_name,
                event_description,
                event_type_id,
                pic,
                location,
                latitude,
                longitude,
                registration_start_date,
                registration_end_date,
                event_start_date,
                event_end_date,
                point
            } = req.body;

            const eventUpdated = await EventService.Update({
                event_name,
                event_description,
                event_type_id,
                pic,
                location,
                latitude,
                longitude,
                registration_start_date,
                registration_end_date,
                event_start_date,
                event_end_date,
                point,
                updated_user: 'admin'
            }, { event_id: id })

            if(!eventUpdated.result){
                throw {
                    message: eventUpdated.message,
                    code: "INTERNAL_SERVER_ERROR",
                    statusCode: 500
                }
            };

            res.status(200).json({ status: 'success', message: eventUpdated.message, data: eventUpdated.data });
        }catch(error: any){
            res.status(error.statusCode?error.statusCode: 500).json({ status: 'failed', message: error, data: null });
        }
    },
    EventJoin: async(req: CustomRequest, res: Response) => {
        try{
            const { event_id, user_id } = req.body;


            const checkHasJoined = await ParticipantnService.CheckIsJoined({ user_id, event_id });
            
            if(checkHasJoined.data){
                throw {
                    message: "user has joined",
                    code: "INTERNAL_SERVER_ERROR",
                    statusCode: 211
                }
            }

            const eventJoined = await EventService.Join({ event_id, user_id });

            if(!eventJoined.result){
                throw {
                    message: eventJoined.message,
                    code: "INTERNAL_SERVER_ERROR",
                    statusCode: 500
                }
            };

            res.status(200).json({ status: 'success', message: eventJoined.message, data: eventJoined.data });
        }catch(error: any){
            res.status(error.statusCode?error.statusCode: 500).json({ status: 'failed', message: error, data: null });
        }
    },
    EventFindById: async(req: CustomRequest, res: Response) => {
        try{
            const { id } = req.params;

            const eventFound = await EventService.FindById({ id: parseInt(id) });

            if(!eventFound.result){
                throw {
                    message: eventFound.message,
                    code: "INTERNAL_SERVER_ERROR",
                    statusCode: 500
                }
            };

            res.status(200).json({ status: 'success', message: eventFound.message, data: eventFound.data });
        }catch(error: any){
            res.status(error.statusCode?error.statusCode: 500).json({ status: 'failed', message: error, data: null });
        }
    },
    EventParticipationByUserId: async(req: CustomRequest, res: Response) => {
        try{
            const { user_id } = req.params;
            const eventFound = await EventService.FindByUserId({ user_id });

            if(!eventFound.result){
                throw {
                    message: eventFound.message,
                    code: "INTERNAL_SERVER_ERROR",
                    statusCode: 500
                }
            };

            res.status(200).json({ status: 'success', message: eventFound.message, data: eventFound.data });
        }catch(error: any){
            res.status(error.statusCode?error.statusCode: 500).json({ status: 'failed', message: error, data: null });
        }
    },
    EventFindAll: async(req: CustomRequest, res: Response) => {
        try{
            const eventFound = await EventService.FindAll();

            if(!eventFound.result){
                throw {
                    message: eventFound.message,
                    code: "INTERNAL_SERVER_ERROR",
                    statusCode: 500
                }
            };

            res.status(200).json({ status: 'success', message: eventFound.message, data: eventFound.data });
        }catch(error: any){
            res.status(error.statusCode?error.statusCode: 500).json({ status: 'failed', message: error, data: null });
        }
    },
    EventDelete: async(req: CustomRequest, res: Response) => {
        try{
            const { id } = req.params;

            const eventDeleted = await EventService.Delete({ id: parseInt(id) });

            if(!eventDeleted.result){
                throw {
                    message: eventDeleted.message,
                    code: "INTERNAL_SERVER_ERROR",
                    statusCode: 500
                }
            };

            res.status(200).json({ status: 'success', message: eventDeleted.message, data: eventDeleted.data });
        }catch(error: any){
            res.status(error.statusCode?error.statusCode: 500).json({ status: 'failed', message: error, data: null });
        }
    }
}