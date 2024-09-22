import db from "../models";

export const ExerciseService = {
    getListExercises: async ({ category_name }: any) => {
        try{
            const exerciseFound = await db.sequelize.query(
                `
                    select 
                    e.id, e.exercise_name, e.exercise_description, ec.category_name,
                    CONCAT('public/photos/',e.exercise_cover) as exercise_cover
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
    }
}