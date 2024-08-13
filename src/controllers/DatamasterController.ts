import { CustomRequest } from "../interfaces/ExpressCustomInterface";
import { Response } from "express";
import { DivisionService } from "../services/DivisionService";

export const DatamasterController = {
    DivisionCreate: async(req: CustomRequest, res: Response) => {
        try{
            const {
                division_name,
                division_description
            } = req.body;

            const divisionCreated = await DivisionService.Create({ division_name, division_description, created_user: 'admin' });

            if(!divisionCreated.result){
                throw {
                    message: divisionCreated.message,
                    code: "INTERNAL_SERVER_ERROR",
                    statusCode: 500
                }
            };

            res.status(200).json({ status: 'success', message: divisionCreated.message, data: divisionCreated.data });
        }catch(error: any){
            res.status(error.statusCode?error.statusCode: 500).json({ status: 'failed', message: error, data: null });
        }
    },
    DivisionGetAll: async(req: CustomRequest, res: Response) => {
        try{
            const divisionFound = await DivisionService.GetAll();

            if(!divisionFound.result){
                throw {
                    message: divisionFound.message,
                    code: "INTERNAL_SERVER_ERROR",
                    statusCode: 500
                }
            };

            res.status(200).json({ status: 'success', message: divisionFound.message, data: divisionFound.data });
        }catch(error: any){
            res.status(error.statusCode?error.statusCode: 500).json({ status: 'failed', message: error, data: null });
        }
    },
    DivisionDelete: async(req: CustomRequest, res: Response) => {
        try{
            const { id } = req.params;

            const divisionDeleted = await DivisionService.Delete({ id: parseInt(id) });

            if(!divisionDeleted.result){
                throw {
                    message: divisionDeleted.message,
                    code: "INTERNAL_SERVER_ERROR",
                    statusCode: 500
                }
            };

            res.status(200).json({ status: 'success', message: divisionDeleted.message, data: divisionDeleted.data });
        }catch(error: any){
            res.status(error.statusCode?error.statusCode: 500).json({ status: 'failed', message: error, data: null });
        }
    },
}