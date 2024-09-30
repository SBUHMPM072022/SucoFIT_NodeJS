import db from "../models";

export const SpotService = {
    Create: async ({
        spot_name,
        spot_photo,
        exercise_id,
        open_hour,
        close_hour,
        contact_number,
        detail_address,
        latitude,
        longitude
    }: any) => {
        try{
            const spotCreated = db.spot.create({
                spot_name,
                spot_photo,
                exercise_id,
                open_hour,
                close_hour,
                contact_number,
                detail_address,
                latitude,
                longitude
            });

            return { result: true, message: "Create new spot success", data: spotCreated };
        }catch(error){
            return { result: false, message: error, data: null };
        }
    },
    GetListSpot: async () => {
        try{
            const spotFound = await db.sequelize.query(
                `
                    select 
                    s.id ,
                    s.spot_name ,
                    CONCAT('public/photos/', s.spot_photo) as spot_photo,
                    round(jsr.average_rating, 2) average_rating, jsr.total_review
                    from spots s 
                    left join (
                    	select 
                    	spot_id ,
                    	AVG(rating) average_rating,
                    	count(*) total_review
                    	from spot_reviews sr 
                    	group by spot_id 
                    )jsr on jsr.spot_id = s.id 
                `,
                {
                    type: db.sequelize.QueryTypes.SELECT 
                }
            )

            return { result: true, message: "Get list spot success", data: spotFound };
        }catch(error){
            return { result: false, message: error, data: null };
        }
    },
    GetSpotById: async (spot_id: number) => {
        try{
            const spotFound = await db.sequelize.query(
                `
                    select 
                    s.id ,
                    s.spot_name ,
                    CONCAT('public/photos/', s.spot_photo) as spot_photo,
                    jsr.average_rating, jsr.total_review,
                    s.detail_address, s.open_hour, s.close_hour,
                    s.contact_number
                    from spots s 
                    left join (
                    	select 
                    	spot_id ,
                    	AVG(rating) average_rating,
                    	count(*) total_review
                    	from spot_reviews sr 
                    	group by spot_id 
                    )jsr on jsr.spot_id = s.id 
                    where s.id = :spot_id
                `,
                {
                    replacements: {
                        spot_id
                    },
                    type: db.sequelize.QueryTypes.SELECT 
                }
            )

            return { result: true, message: "Get spot by id success", data: spotFound?spotFound[0]:{} };
        }catch(error){
            return { result: false, message: error, data: null };
        }
    }
}