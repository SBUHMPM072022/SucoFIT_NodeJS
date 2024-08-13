export const DivisionModel = (sequelize: any, Sequelize: any) => {
    return sequelize.define('division', {
        division_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        division_description: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        created_user: {
            type: Sequelize.STRING
        }
    })
}