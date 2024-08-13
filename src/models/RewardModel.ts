export const RewardModel = (sequelize: any, Sequelize: any) => {
    return sequelize.define('reward', {
        position: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        prize: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        created_user: {
            type: Sequelize.STRING
        },
        updated_user: {
            type: Sequelize.STRING
        }
    })
}