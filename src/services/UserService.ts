import db from "../models"
import { UserDelete, UserRegister } from "../interfaces/UserInterface";

export const UserService = {
    Register: async({
        fullname,
        division_id,
        email,
        phone_number,
        password,
        role_id,
        created_user
    }: UserRegister) => {
        try{
            const userService = await db.user.create({
                fullname,
                division_id,
                role_id,
                email,
                phone_number,
                password,
                created_user
            });

            return { result: true, message: "Register user success", data: userService };
        }catch(error){
            return { result: false, message: error, data: null };
        }
    },
    Delete: async({ id }: UserDelete) => {
        try{
            await db.user.destroy({
                where: {
                    id
                }
            });

            return { result: true, message: "Delete user success", data: null };
        }catch(error){
            return { result: false, message: error, data: null };
        }
    }
}