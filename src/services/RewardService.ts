import db from "../models"
import { DivisionDelete, DivisionCreate } from "../interfaces/DivisionInterface";
import { ParticipantCreate, ParticipantDelete, ParticipantFindId } from "../interfaces/ParticipantInterface";
import { RewardCreate } from "../interfaces/RewardInterface";

export const RewardService = {
    Create: async({
        position,
        description,
        prize,
        created_user
    }: RewardCreate) => {
        try{
            const rewardCreated = await db.reward.create({
                position,
                description,
                prize,
                created_user
            });

            return { result: true, message: "Create reward success", data: rewardCreated };
        }catch(error){
            return { result: false, message: error, data: null };
        }
    },
    FindAll: async() => {
        try{
            const rewardFound = await db.sequelize.query(
                `
                    select *
                    from rewards r
                `,
                {
                    type: db.sequelize.QueryTypes.SELECT 
                }
            );

            return { result: true, message: "Find all reward success", data: rewardFound };
        }catch(error){
            return { result: false, message: error, data: null };
        }
    },
    Delete: async({ id }: ParticipantDelete) => {
        try{
            await db.participant.destroy({
                where: {
                    id
                }
            });

            return { result: true, message: "Delete participant success", data: null };
        }catch(error){
            return { result: false, message: error, data: null };
        }
    }
}