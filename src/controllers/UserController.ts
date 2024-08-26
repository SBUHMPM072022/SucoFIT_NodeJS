import { CustomRequest } from "../interfaces/ExpressCustomInterface";
import { Response } from "express";
import { ParticipantnService } from "../services/ParticipantService";
import { UserService } from "../services/UserService";

export const UserController = {
    UserRegister: async(req: CustomRequest, res: Response) => {
        try{
            const {
                fullname,
                division_id,
                email,
                phone_number,
                password,
                role_id
            } = req.body;

            const userCreated = await UserService.Register({
                fullname,
                division_id,
                email,
                phone_number,
                password,
                role_id,
                created_user: 'admin'
            })

            if(!userCreated.result){
                throw {
                    message: userCreated.message,
                    code: "INTERNAL_SERVER_ERROR",
                    statusCode: 500
                }
            };

            res.status(200).json({ status: 'success', message: userCreated.message, data: userCreated.data });
        }catch(error: any){
            res.status(error.statusCode?error.statusCode: 500).json({ status: 'failed', message: error, data: null });
        }
    },
    GetLeaderBoard: async(req: CustomRequest, res: Response) => {
        try{
            const userFound = await UserService.GetLeaderBoard();

            if(!userFound.result){
                throw {
                    message: userFound.message,
                    code: "INTERNAL_SERVER_ERROR",
                    statusCode: 500
                }
            };

            res.status(200).json({ status: 'success', message: userFound.message, data: userFound.data });
        }catch(error: any){
            res.status(error.statusCode?error.statusCode: 500).json({ status: 'failed', message: error, data: null });
        }
    },
    UserDelete: async(req: CustomRequest, res: Response) => {
        try{
            const { id } = req.params;

            const userDeleted = await UserService.Delete({ id: parseInt(id) });

            if(!userDeleted.result){
                throw {
                    message: userDeleted.message,
                    code: "INTERNAL_SERVER_ERROR",
                    statusCode: 500
                }
            };

            res.status(200).json({ status: 'success', message: userDeleted.message, data: userDeleted.data });
        }catch(error: any){
            res.status(error.statusCode?error.statusCode: 500).json({ status: 'failed', message: error, data: null });
        }
    }
}