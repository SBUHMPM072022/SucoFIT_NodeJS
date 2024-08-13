export const RoleModel = (sequelize: any, Sequelize: any) => {
    return sequelize.define('role', {
        role: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })
}