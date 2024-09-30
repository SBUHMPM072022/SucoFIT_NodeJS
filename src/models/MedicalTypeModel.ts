export const MedicalTypeModel = (sequelize: any, Sequelize: any) => {
    return sequelize.define('medical_type', {
        medical_type: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })
}