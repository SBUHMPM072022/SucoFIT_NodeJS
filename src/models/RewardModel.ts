export const RewardModel = (sequelize: any, Sequelize: any) => {
    return sequelize.define('reward', {
        position: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        prize: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        start_date: {
            type: Sequelize.DATE
        },
        end_date: {
            type: Sequelize.DATE
        },
        created_user: {
            type: Sequelize.STRING
        },
        updated_user: {
            type: Sequelize.STRING
        }
    })
}