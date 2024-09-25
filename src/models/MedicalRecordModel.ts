export const MedicalRecordModel = (sequelize: any, Sequelize: any) => {
    return sequelize.define('medical_record', {
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        systolic_blood_pressure: {
            type: Sequelize.INTEGER
        },
        diastolic_blood_pressure: {
            type: Sequelize.INTEGER
        },
        blood_sugar: {
            type: Sequelize.INTEGER
        },
        cholesterol: {
            type: Sequelize.INTEGER
        }
    })
}