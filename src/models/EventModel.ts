export const EventModel = (sequelize: any, Sequelize: any) => {
    return sequelize.define('event', {
        event_name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "faq question must be not empty"
                }
            }
        },
        event_description: {
            type: Sequelize.TEXT,
            allowNull: false, 
            validate: {
                notEmpty: {
                    msg: "faq answer must be not empty"
                }
            }
        },
        event_type_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        pic: {
            type: Sequelize.STRING,
            allowNull: false
        },
        location: {
            type: Sequelize.STRING,
            alowNull: false,
        },
        latitude: {
            type: Sequelize.STRING,
            allowNull: false
        },
        longitude: {
            type: Sequelize.STRING,
            allowNull: false
        },
        registration_start_date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        registration_end_date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        event_start_date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        event_end_date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        created_user: {
            type: Sequelize.STRING
        },
        updated_user: {
            type: Sequelize.STRING
        },
        point: {
            type: Sequelize.INTEGER
        }
    });
};