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
    GetLeaderBoard: async () => {
        try{
            const userFound = await db.user.findAll({
                attributes: ['id', 'username', 'fullname', 'total_point'],
                order: [['total_point', 'desc']]
            });
            return { result: true, message: "Get leaderboard success", data: userFound };
        }catch(error){
            return { result: false, message: error, data: null };
        }
    },
    GetActiveUser: async () => {
        try{
            const userActiveFound = await db.sequelize.query(
                `
                    select count(*)
                    from (
                    	select user_id 
                    	from participants p 
                    	where activity_start is not null and activity_stop is not null
                    	group by user_id 
                    )sub1
                `,
                {
                    type: db.sequelize.QueryTypes.SELECT 
                }
            )

            return { result: true, message: "Get active user success", data: userActiveFound };
        }catch(error){
            return { result: false, message: error, data: null };
        }
    },
    GetTotalUser: async() => {
        try{
            const userTotalFound = await db.sequelize.query(
                `
                    select count(*)
                    from users u 
                `,
                {
                    type: db.sequelize.QueryTypes.SELECT 
                }
            );

            return { result: true, message: "Get active user success", data: userTotalFound };
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