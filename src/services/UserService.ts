import db from "../models"
import { UserDelete, UserLogin, UserRegister } from "../interfaces/UserInterface";
import { Auth, StringFormat } from "../utils/helper";

export const UserService = {
    login: async ({
        email,
        password
    }: UserLogin) => {
        try{
            const userFound = await db.user.findOne({ where: { email }, attributes: ['id', 'username', 'email', 'role_id', 'fullname'] });
            if(!userFound) throw "Email is not valid please try again";
            
            const passwordFound = await db.user.findOne({ where: { email }, attributes: ['password'] });
            
            const isPasswordValid = Auth.ComparePassword(passwordFound.password, password);
            
            if(!isPasswordValid) throw "Password is not valid please try again";

            const token = Auth.GenerateTokenMobile({ userData: userFound });
            const refreshToken = Auth.GeneraterRefreshToken({ userData: userFound });

            return { result: true, message: "Login user success", data: { token, refreshToken, role_id: userFound.role_id } };
        }catch(error){
            return { result: false, message: error, data: null };
        }
    },
    loginMobile: async ({
        email,
        password
    }: UserLogin) => {
        try{
            let userFound = await db.sequelize.query(
                `
                    select 
                    u.id, u.username, u.email, u.fullname, u.role_id, u.total_point, 
                    u.phone_number, r.role, d.division_name,
                    CONCAT('public/photos/', profile_picture) profile_picture
                    from users u
                    join divisions d on d.id = u.division_id
                    join roles r on r.id = u.role_id
                    where u.email = :email
                `,
                {
                    replacements: {
                        email
                    },
                    type: db.sequelize.QueryTypes.SELECT 
                }
            )

            if(!userFound) throw "Email is not valid please try again";
            userFound = userFound[0];
            
            const passwordFound = await db.user.findOne({ where: { email }, attributes: ['password'] });
            
            const isPasswordValid = Auth.ComparePassword(passwordFound.password, password);
            
            if(!isPasswordValid) throw "Password is not valid please try again";

            const token = Auth.GenerateTokenMobile({ userData: userFound });

            return { result: true, message: "Login user success", data: { token, fullname: userFound.fullname, role_id: userFound.role_id, total_point: userFound.total_point, profile_picture: userFound.profile_picture, user_id: userFound.id } };
        }catch(error){
            return { result: false, message: error, data: null };
        }
    },
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
            const uniqueUsername = StringFormat.FormatName({ name: fullname });
            const userService = await db.user.create({
                fullname,
                username: uniqueUsername,
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
                attributes: ['id', 'username', 'fullname', 'total_point', [ db.Sequelize.literal(`CONCAT('public/photos/', profile_picture)`), 'profile_picture']],
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
    },
    AddPoint: async ({ point, user_id }: any) => {
        try{
            const userFound = await db.user.findOne({ where: { id: user_id } });
            
            const userAdded = await db.user.update(
                {
                    total_point: userFound.total_point + point
                },
                {
                    where: {
                        id: user_id
                    }
                }
            );

            return { result: true, message: "Add user point success", data: userAdded };
        }catch(error){
            return { result: false, message: error, data: null };
        }
    },
    GetPointByUser: async (user_id: any) => {
        try{
            const userFound = await db.user.findOne({
                where: { id: parseInt(user_id) },
                attributes: ['total_point']
            })

            return { result: true, message: "Get user point success", data: userFound };
        }catch(error){
            // console.log(error);
            
            return { result: false, message: error, data: null };
        }
    }
}