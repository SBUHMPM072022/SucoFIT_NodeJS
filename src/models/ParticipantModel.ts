export const ParticipantModel = (sequelize: any, Sequelize: any) => {
    return sequelize.define('participant', {
        event_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        join_date: {
            type: Sequelize.DATE,
            allowNull: false
        }, 
        presence_date: {
            type: Sequelize.DATE
        },
        presence_latitude: {
            type: Sequelize.STRING
        },
        presence_longitude: {
            type: Sequelize.STRING
        },
        participation_evidence: {
            type: Sequelize.STRING
        },
        created_user: {
            type: Sequelize.STRING
        },
        updated_user: {
            type: Sequelize.STRING
        },
        is_joined: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    })
}