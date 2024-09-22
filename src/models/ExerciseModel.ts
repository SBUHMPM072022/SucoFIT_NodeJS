export const ExerciseModel = (sequelize: any, Sequelize: any) => {
    return sequelize.define('exercise', {
        exercise_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        exercise_description: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        exercise_cover: {
            type: Sequelize.STRING
        },
        exercise_category_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        point: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    })
}