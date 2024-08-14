import db from "../models"
import { RoleCreate, RoleDelete } from "../interfaces/RoleInterface";

export const RoleService = {
    Create: async({
        role
    }: RoleCreate) => {
        try{
            const roleService = await db.role.create({
                role
            });

            return { result: true, message: "Create role success", data: roleService };
        }catch(error){
            return { result: false, message: error, data: null };
        }
    },
    GetAll: async() => {
        try{
            const roleFound = await db.role.findAll({
                attributes:  [['id', 'value'], ['role', 'label']]
            });
            
            return { result: true, message: "Get all role success", data: roleFound };
        }catch(error){
            return { result: false, message: error, data: null };
        }
    },
    Delete: async({ id }: RoleDelete) => {
        try{
            await db.event_type.destroy({
                where: {
                    id
                }
            });

            return { result: true, message: "Delete role success", data: null };
        }catch(error){
            return { result: false, message: error, data: null };
        }
    }
}