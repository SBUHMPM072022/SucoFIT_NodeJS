export const EventTypeModel = (sequelize: any, Sequelize: any) => {
    return sequelize.define('event_type', {
        event_type: {
            type: Sequelize.STRING,
            allowNull: false
        },
        event_type_description: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        created_user: {
            type: Sequelize.STRING
        },
        updated_user: {
            type: Sequelize.STRING
        }
    })
}