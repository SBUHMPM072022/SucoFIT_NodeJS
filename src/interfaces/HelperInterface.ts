interface DBProperty {
    name: String
    serverName: String
    pass: String
    host: String
    dialect: String
    port: String
}

export interface DBConfigInput {
    db: DBProperty
    pg: any 
    Sequelize: any 
    dbName: string
}
