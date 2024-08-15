import { DBConfigInput } from "../interfaces/HelperInterface";
import { Seeder } from "../seeders/Seeder";

export const ConfigDB = {
    Setting: ({ db, pg, Sequelize, dbName }: DBConfigInput) => {
        const sequelize =  new Sequelize(db.name, db.serverName, db.pass, {
            host: db.host,
            dialect: db.dialect,
            dialectModule: pg,
            port: db.port,
            pool: {
                max: 9,
                min: 0,
                idle: 10000
            }
        });
        
        sequelize.authenticate().then(() => {
            console.log(`${dbName} DB connected`);
        })
        .catch((err: any) => {
            console.log(err);
        });

        return sequelize;
    }
}

export const Seeding = {
    Start: () => {
        Seeder.Down().then(() => {
            Seeder.Up();
        });
    }
}