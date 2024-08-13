import db from "../models"
import { EventTypeCreate, EventTypeDelete } from "../interfaces/EventTypeInterface";

export const EventTypeService = {
    Create: async({
        event_type,
        event_type_description,
        created_user
    }: EventTypeCreate) => {
        try{
            const eventTypeCreated = await db.event_type.create({
                event_type,
                event_type_description, 
                created_user
            });

            return { result: true, message: "Create event type success", data: eventTypeCreated };
        }catch(error){
            return { result: false, message: error, data: null };
        }
    },
    GetAll: async() => {
        try{
            const eventTypeFound = await db.event_type.findAll({
                attributes:  [['id', 'value'], ['event_type', 'label']]
            });
            
            return { result: true, message: "Get all event type success", data: eventTypeFound };
        }catch(error){
            return { result: false, message: error, data: null };
        }
    },
    Delete: async({ id }: EventTypeDelete) => {
        try{
            const eventTypeDeleted = await db.event_type.destroy({
                where: {
                    id
                }
            });

            return { result: true, message: "Event type success", data: null };
        }catch(error){
            return { result: false, message: error, data: null };
        }
    }
}