export const SpotModel = (sequelize: any, Sequelize: any) => {
    return sequelize.define('spot', {
        spot_name: {
            type: Sequelize.STRING
        },
        spot_photo: {
            type: Sequelize.STRING
        },
        exercise_id: {
            type: Sequelize.INTEGER
        },
        open_hour: {
            type: Sequelize.STRING
        },
        close_hour: {
            type: Sequelize.STRING
        },
        contact_number: {
            type: Sequelize.STRING
        },
        detail_address: {
            type: Sequelize.TEXT
        },
        latitude: {
            type: Sequelize.STRING
        },
        longitude: {
            type: Sequelize.STRING
        }
    })
}