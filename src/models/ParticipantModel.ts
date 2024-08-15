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
        activity_start: {
            type: Sequelize.DATE
        },
        activity_stop: {
            type: Sequelize.DATE
        },
        duration: {
            type: Sequelize.INTEGER,
            allowNull: true
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
        }
    })
}