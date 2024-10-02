import db from "../models";

export const ExerciseService = {
    getListExercises: async ({ category_name }: any) => {
        try{
            const exerciseFound = await db.sequelize.query(
                `
                    select 
                    e.id, e.exercise_name, e.exercise_description, ec.category_name,
                    CONCAT('public/photos/',e.exercise_cover) as exercise_cover,
                    e.point
                    from exercises e
                    join exercise_categories ec on ec.id = e.exercise_category_id
                    where ec.category_name ilike :category_name
                `,
                {
                    replacements: {
                        category_name: (category_name == 'All' || !category_name)?'%%':`%${category_name}%`
                    },
                    type: db.sequelize.QueryTypes.SELECT 
                }
            );

            return { result: true, message: "Get list exercise success", data: exerciseFound };
        }catch(error){
            return { result: false, message: error, data: null };
        }
    },
    getListExerciseStory: async () => {
        try{
            const exerciseFound = await db.sequelize.query(
                `
                    select 
                    max(e.id) id, max(e.exercise_name) exercise_name, 
                    CONCAT('public/photos/',max(e.exercise_cover)) as exercise_cover
                    from exercises e
                    join exercise_categories ec on ec.id = e.exercise_category_id
                    join (
                    	select *
                    	from exercise_records er 
                    	where date_trunc('day', er."createdAt") BETWEEN CURRENT_DATE - INTERVAL '2 days' AND CURRENT_DATE
                    	and er.evidence is not null
                    )jer on jer.exercise_id = e.id
                    group by exercise_name
                `,
                {
                    type: db.sequelize.QueryTypes.SELECT 
                }
            );

            return { result: true, message: "Get list exercise success", data: exerciseFound };
        }catch(error){
            return { result: false, message: error, data: null };
        }
    },
    GetExerciseStory: async ({ exercise_name }: any) => {
        try{
            const exerciseFound = await db.sequelize.query(
                `
                    select 
                    er.id , er.exercise_id , e.exercise_name , er.duration ,
                    u.username , u.fullname ,
                    concat('public/photos/', er.evidence) evidence
                    from exercise_records er 
                    join users u ON u.id = er.user_id 
                    join exercises e on e.id = er.exercise_id 
                    where date_trunc('day', er."createdAt") BETWEEN CURRENT_DATE - INTERVAL '2 days' AND CURRENT_DATE
                    and e.exercise_name ilike :exercise_name and er.evidence is not null
                `,
                {
                    replacements: {
                        exercise_name: exercise_name?`%${exercise_name}%`:'%%'
                    },
                    type: db.sequelize.QueryTypes.SELECT 
                }
            )

            return { result: true, message: "Get exercise story success", data: exerciseFound };
        }catch(error){
            return { result: false, message: error, data: null };
        }
    },
    GetExerciseById: async ({ exercise_id }: any) => {
        try{
            const exerciseFound = await db.exercise.findOne({ where: { id: exercise_id } });

            return { result: true, message: "Get exercise by id success", data: exerciseFound };
        }catch(error){
            return { result: false, message: error, data: null };
        }
    },
    GetTopExercise: async () => {
        try{
            const topExerciseFound = await db.sequelize.query(
                `
                    select 
                    sub2.id, sub2.exercise_name, sub2.exercise_cover,
                    sub2.frequency
                    from (
                    	select 
                    	e.id, e.exercise_name , 
                    	CONCAT('public/photos/', e.exercise_cover) exercise_cover,
                    	case 
                    		when jq.quantity is null then 0
                    		else jq.quantity
                    	end frequency
                    	from exercises e 
                    	left join (
                    		select e.id ,
                    		count(*) quantity
                    		from exercise_records er 
                    		right join exercises e on e.id = er.exercise_id 
                    		where er.id is not null
                    		group by e.id 
                    	)jq on jq.id = e.id 
                    )sub2
                    order by sub2.frequency DESC
                `,
                {
                    type: db.sequelize.QueryTypes.SELECT 
                }
            )

            const totalExerciseRecord = await db.sequelize.query(
                `
                    select count(*) from exercise_records er
                `,
                {
                    type: db.sequelize.QueryTypes.SELECT 
                }
            );

            topExerciseFound.map((value: any) => {
                value.frequency = ((value.frequency/totalExerciseRecord[0].count)*100).toFixed(2)
            })

            return { result: true, message: "Get top exercise success", data: topExerciseFound };
        }catch(error){
            return { result: false, message: error, data: null };
        }
    }
}