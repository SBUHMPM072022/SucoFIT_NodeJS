export const SpotReviewModel = (sequelize: any, Sequelize: any) => {
    return sequelize.define('spot_review', {
        user_id: {
            type: Sequelize.INTEGER
        },
        spot_id: {
            type: Sequelize.INTEGER
        },
        comment: {
            type: Sequelize.TEXT
        },
        photo: {
            type: Sequelize.STRING
        },
        rating: {
            type: Sequelize.INTEGER
        }
    })
}