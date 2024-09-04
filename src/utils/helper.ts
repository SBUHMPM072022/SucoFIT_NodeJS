import { DBConfigInput } from "../interfaces/HelperInterface";
import { Seeder } from "../seeders/Seeder";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

const TOKEN_SECRET_KEY: any = process.env.SECRET_KEY;
const TOKEN_REFRESH_SECRET_KEY: any = process.env.SECRET_REFRESH_KEY;

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

export const StringFormat = {
    FormatName: ({ name }: any) => {
        let formattedName = name.toLowerCase();
        formattedName = formattedName.replace(/\s+/g, "_");
        const randomDigits = Math.floor(100 + Math.random() * 900); // Menghasilkan angka antara 100 dan 999
        formattedName += randomDigits;
        
        return formattedName;
    }
}

export const Auth = {
    ComparePassword: (hashPassword: string, password: string) => {
        return bcrypt.compareSync(password, hashPassword);
    },
    GenerateTokenMobile: ({ userData }: any) => {
        const token = jwt.sign(
            {
                id: userData.id,
                username: userData.username,
                email: userData.email,
                role_id: userData.role_id,
                fullname: userData.fullname
            }, 
            TOKEN_SECRET_KEY, 
            { expiresIn: '6h' }
        );

        return token  
    },
    GenerateToken: ({ userData }: any) => {
        const token = jwt.sign(
            {
                id: userData.id,
                username: userData.username,
                email: userData.email,
                role_id: userData.role_id,
                fullname: userData.fullname
            }, 
            TOKEN_SECRET_KEY, 
            { expiresIn: '6h' }
        );

        return token  
    },
    GeneraterRefreshToken: ({ userData }: any) => {
        const token = jwt.sign(
            {
                id: userData.id,
                username: userData.username,
                email: userData.email,
                role_id: userData.role_id,
                fullname: userData.fullname
            },
            TOKEN_REFRESH_SECRET_KEY,
            { expiresIn: '6h' }
          );
          return token;
    }
}