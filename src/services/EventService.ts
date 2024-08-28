import db from "../models"
import { EventCreate, EventDelete, EventFindId, EventUpdate } from "../interfaces/EventInterface";

export const EventService = {
    Create: async({
        event_name,
        event_description,
        event_type_id,
        pic,
        location,
        latitude,
        longitude,
        registration_start_date,
        registration_end_date,
        event_start_date,
        event_end_date,
        point,
        created_user
    }: EventCreate) => {
        try{
            const eventCreated = await db.event.create({
                event_name,
                event_description,
                event_type_id,
                pic,
                location,
                latitude,
                longitude,
                registration_start_date,
                registration_end_date,
                event_start_date,
                event_end_date,
                point,
                created_user
            });

            return { result: true, message: "Create event success", data: eventCreated };
        }catch(error){
            return { result: false, message: error, data: null };
        }
    },
    Update: async({
        event_name,
        event_description,
        event_type_id,
        pic,
        location,
        latitude,
        longitude,
        registration_start_date,
        registration_end_date,
        event_start_date,
        event_end_date,
        point,
        updated_user
    }: EventUpdate, { event_id }: any) => {
        try{

            const eventUpdated = await db.event.update(
                {
                    event_name,
                    event_description,
                    event_type_id,
                    pic,
                    location,
                    latitude,
                    longitude,
                    registration_start_date,
                    registration_end_date,
                    event_start_date,
                    event_end_date,
                    point,
                    updated_user
                },
                {
                    where: {
                        id: event_id
                    }
                }
            )

            return { result: true, message: "Update event success", data: eventUpdated };
        }catch(error){
            console.log(error);
            return { result: false, message: error, data: null };
        }
    },
    GetAll: async() => {
        try{
            const eventFound = await db.event.findAll({
                attributes:  [['id', 'value'], ['event_name', 'label']]
            });
            
            return { result: true, message: "Get all event success", data: eventFound };
        }catch(error){
            return { result: false, message: error, data: null };
        }
    },
    FindById: async({ id }: EventFindId) => {
        try{
            const eventFound = await db.sequelize.query(
                `
                    select 
                    e.id,
                    e.event_name ,
                    e.event_description,
                    e.event_type_id,
                    e.pic ,
                    e."location" ,
                    e.latitude,
                    e.longitude,
                    to_char(e.registration_start_date, 'YYYY-MM-DD') registration_start_date,
                    to_char(e.registration_end_date, 'YYYY-MM-DD') registration_end_date,
                    to_char(e.event_start_date, 'YYYY-MM-DD') event_start_date,
                    to_char(e.event_end_date, 'YYYY-MM-DD') event_end_date,
                    e.point,
                    concat(to_char(e.registration_start_date, 'DD-Mon-YYYY'), ' - ', to_char(e.registration_start_date, 'DD-Mon-YYYY')) as registration_date,
                    concat(to_char(e.event_start_date, 'DD-Mon-YYYY'), ' - ', to_char(e.event_start_date, 'DD-Mon-YYYY')) as event_date
                    from events e 
                    left join event_types et on et.id = e.event_type_id 
                    where e.id =:id

                `,
                {
                    replacements: {
                        id
                    },
                    type: db.sequelize.QueryTypes.SELECT 
                }
            );

            return { result: true, message: "Find event by id success", data: eventFound?eventFound[0]: {} };
        }catch(error){
            return { result: false, message: error, data: null };
        }
    },
    FindAll: async() => {
        try{
            const eventFound = await db.sequelize.query(
                `
                    select 
                    e.id,
                    e.event_name ,
                    e.pic ,
                    e."location" ,
                    concat(to_char(e.registration_start_date, 'DD-Mon-YYYY'), ' - ', to_char(e.registration_start_date, 'DD-Mon-YYYY')) as registration_date,
                    concat(to_char(e.event_start_date, 'DD-Mon-YYYY'), ' - ', to_char(e.event_start_date, 'DD-Mon-YYYY')) as event_date
                    from events e 
                    left join event_types et on et.id = e.event_type_id 
                `,
                {
                    type: db.sequelize.QueryTypes.SELECT 
                }
            );

            return { result: true, message: "Find all event success", data: eventFound };
        }catch(error){
            return { result: false, message: error, data: null };
        }
    },
    Delete: async({ id }: EventDelete) => {
        try{
            await db.division.destroy({
                where: {
                    id
                }
            });

            return { result: true, message: "Delete event success", data: null };
        }catch(error){
            return { result: false, message: error, data: null };
        }
    }
}