import { Sequelize, Op } from "sequelize";
import pg from "pg";
import dotenv from "dotenv";
import { ConfigDB } from "../utils/helper";

import { DivisionModel } from "./DivisionModel";
import { EventModel } from "./EventModel";
import { EventTypeModel } from "./EventTypeModel";
import { ParticipantModel } from "./ParticipantModel";
import { RewardModel } from "./RewardModel";
import { UserModel } from "./UserModel";
import { RoleModel } from "./RoleModel";

dotenv.config();

const sucofit_db_config: any = {
    name: process.env.DBNAME,
    serverName: process.env.SERVERNAME,
    pass: process.env.DBPASS,
    host: process.env.HOST,
    dialect: process.env.DBDIALECT,
    port: process.env.DB_PORT
};

const sequelize = ConfigDB.Setting({
    db: sucofit_db_config,
    pg,
    Sequelize,
    dbName: "SucoFIT"
});

const db: any = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Op = Op;

db.division = DivisionModel(sequelize, Sequelize);
db.event = EventModel(sequelize, Sequelize);
db.event_type = EventTypeModel(sequelize, Sequelize);
db.participant = ParticipantModel(sequelize, Sequelize);
db.reward = RewardModel(sequelize, Sequelize);
db.user = UserModel(sequelize, Sequelize);
db.role = RoleModel(sequelize, Sequelize);

db.division.hasMany(db.user, {
    foreignKey: "division_id",
});
db.user.belongsTo(db.division, {
    foreignKey: "division_id",
});

db.role.hasMany(db.user, {
    foreignKey: "role_id",
});
db.user.belongsTo(db.role, {
    foreignKey: "role_id",
});

db.event_type.hasMany(db.event, {
    foreignKey: "event_type_id",
});
db.event.belongsTo(db.event_type, {
    foreignKey: "event_type_id",
});

db.event.hasMany(db.participant, {
    foreignKey: "event_id",
});
db.participant.belongsTo(db.event, {
    foreignKey: "event_id",
});

db.user.hasMany(db.participant, {
    foreignKey: "user_id",
});
db.participant.belongsTo(db.user, {
    foreignKey: "user_id",
});

export default db;

