export const ExerciseCategoryModel = (sequelize: any, Sequelize: any) => {
    return sequelize.define('exercise_category', {
        category_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        category_description: {
            type: Sequelize.TEXT,
            allowNull: true
        }
    })
}