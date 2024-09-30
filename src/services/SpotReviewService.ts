import db from "../models";

export const SpotReviewService = {
    Create: async ({
        user_id,
        spot_id,
        comment,
        rating,
    }: any) => {
        try{
            const spotReviewCreated = db.spot_review.create({
                user_id,
                spot_id,
                comment,
                rating,
            });

            return { result: true, message: "Create spot review success", data: spotReviewCreated };
        }catch(error){
            return { result: false, message: error, data: null };
        }
    },
    GetReviewList: async (spot_id: number) => {
        try{
            const spotReviewFound = await db.sequelize.query(
                `
                    select 
                    sr.id ,
                    u.fullname,
                    sr."comment",
                    sr.rating,
                    CONCAT('public/photos/', u.profile_picture) as profile_picture
                    from spot_reviews sr 
                    join users u on u.id = sr.user_id 
                    where sr.spot_id = :spot_id
                `,
                {
                    replacements: {
                        spot_id
                    },
                    type: db.sequelize.QueryTypes.SELECT 
                }
            )

            return { result: true, message: "Get spot review success", data: spotReviewFound };
        }catch(error){
            return { result: false, message: error, data: null };
        }
    }
}