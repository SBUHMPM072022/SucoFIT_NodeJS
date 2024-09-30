export const ExerciseRecordModel = (sequelize: any, Sequelize: any) => {
    return sequelize.define('exercise_record', {
        exercise_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        duration: {
            type: Sequelize.INTEGER
        },
        latitude: {
            type: Sequelize.STRING
        },
        longitude: {
            type: Sequelize.STRING
        },
        evidence: {
            type: Sequelize.STRING
        }
    })
}