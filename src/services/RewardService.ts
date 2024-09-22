import db from "../models"
import { RewardCreate, RewardUpdate } from "../interfaces/RewardInterface";

export const RewardService = {
    Create: async({
        start_date,
        end_date,
        start_rank,
        end_rank
    }: RewardCreate) => {
        try{
            await db.reward.truncate();
            for (let i = parseInt(start_rank); i <= parseInt(end_rank); i++) {
                try {
                  await db.reward.create({
                    position: i,
                    start_date: start_date,
                    end_date: end_date
                  });
                } catch (error) {
                  console.error(error);
                }
            }
            
            return { result: true, message: "Create reward success", data: null };
        }catch(error){
            return { result: false, message: error, data: null };
        }
    },
    Update: async({
        description,
        prize
    }: RewardUpdate, { reward_id }: any) => {
        try{
            const rewardUpdated = await db.reward.update(
                {
                    description,
                    prize
                },
                {
                    where: {
                        id: reward_id
                    }
                }
            )

            return { result: true, message: "Update reward success", data: rewardUpdated };
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
    FindById: async(id :number) => {
        try{
            const rewardFound = await db.reward.findOne({ where: { id } })
            return { result: true, message: "Find reward by id success", data: rewardFound };
        }catch(error){
            return { result: false, message: error, data: null };
        }
    }
}