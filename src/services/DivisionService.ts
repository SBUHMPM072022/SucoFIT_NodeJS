import db from "../models"
import { DivisionDelete, DivisionCreate } from "../interfaces/DivisionInterface";

export const DivisionService = {
    Create: async({
        division_name,
        division_description,
        created_user
    }: DivisionCreate) => {
        try{
            const divisionCreated = await db.division.create({
                division_name,
                division_description, 
                created_user
            });

            return { result: true, message: "Create division success", data: divisionCreated };
        }catch(error){
            return { result: false, message: error, data: null };
        }
    },
    GetAll: async() => {
        try{
            const divisionFound = await db.division.findAll({
                attributes:  [['id', 'value'], ['division_name', 'label']]
            });
            
            return { result: true, message: "Get all division success", data: divisionFound };
        }catch(error){
            return { result: false, message: error, data: null };
        }
    },
    Delete: async({ id }: DivisionDelete) => {
        try{
            const divisionDeleted = await db.division.destroy({
                where: {
                    id
                }
            });

            return { result: true, message: "Delete division success", data: null };
        }catch(error){
            return { result: false, message: error, data: null };
        }
    }
}