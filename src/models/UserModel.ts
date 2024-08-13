import bcrypt from 'bcrypt';

export const UserModel = (sequelize: any, Sequelize: any) => {
    return sequelize.define('user', {
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        role_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        division_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        phone_number: {
            type: Sequelize.STRING,
            allowNull: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false, 
            validate: {
                len: {
                    args: [6, 12],
                    msg: "Password must be have 6-12 characters",
                }
            }
        },
        total_point: {
            type: Sequelize.INTEGER,
            allowNull: false, 
            defaultValue: 0
        },
        created_user: {
            type: Sequelize.STRING
        },
        updated_user: {
            type: Sequelize.STRING
        }
    }, {
        hooks: {
            beforeCreate: async (user: any) => {
                if(user.password){
                    const salt = bcrypt.genSaltSync(10, 'a');
                    user.password = bcrypt.hashSync(user.password, salt);
                }
            },
            beforeUpdate: async (user: any, options: any) => {
                if(options.hooks){
                    if(user.password){
                        const salt = bcrypt.genSaltSync(10, 'a');
                        user.password = bcrypt.hashSync(user.password, salt);
                    }
                }
            }
        }
    })
}