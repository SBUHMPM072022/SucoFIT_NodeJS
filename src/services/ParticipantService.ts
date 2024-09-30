import db from "../models"
import { DivisionDelete, DivisionCreate } from "../interfaces/DivisionInterface";
import { ParticipantCreate, ParticipantDelete, ParticipantFindId } from "../interfaces/ParticipantInterface";
import { where } from "sequelize";

export const ParticipantnService = {
    Create: async({
        event_id,
        user_id,
        join_date,
        activity_start,
        activity_stop,
        duration,
        presence_latitude,
        presence_longitude,
        participant_evidence,
        created_user
    }: ParticipantCreate) => {
        try{
            const participantCreated = await db.participant.create({
                event_id,
                user_id,
                join_date,
                activity_start,
                activity_stop,
                duration,
                presence_latitude,
                presence_longitude,
                participant_evidence,
                created_user
            });

            return { result: true, message: "Create participant success", data: participantCreated };
        }catch(error){
            return { result: false, message: error, data: null };
        }
    },
    Update: async({
        id,
        presence_latitude,
        presence_longitude,
        participation_evidence
    }: any) => {
        try{
            const participantUpdated = await db.participant.update(
                {
                    presence_date: new Date(),
                    presence_latitude,
                    presence_longitude,
                    participation_evidence,
                    is_joined: true
                },
                {
                    where: { id }
                }
            )

            return { result: true, message: "Update participant success", data: participantUpdated };
        }catch(error){
            return { result: false, message: error, data: null };
        }
    },
    FindAll: async({ id }: ParticipantFindId) => {
        try{
            const participantFound = await db.sequelize.query(
                `
                    select 
                    u.username , 
                    d.division_name ,
                    to_char(p.join_date, 'DD Mon YYYY') as join_date,
                    EXTRACT(EPOCH FROM (p.activity_stop  - p.activity_start)) / 60 as duration,
                    p.presence_latitude ,
                    p.presence_longitude ,
                    CONCAT('public/photos/',p.participation_evidence) as participant_evidence
                    from participants p 
                    left join users u on u.id = p.user_id 
                    left join events e on e.id = p.event_id 
                    left join divisions d on d.id = u.division_id 
                    where e.id = :id
                `,
                {
                    replacements: {
                        id
                    },
                    type: db.sequelize.QueryTypes.SELECT 
                }
            );

            return { result: true, message: "Find all participant success", data: participantFound };
        }catch(error){
            return { result: false, message: error, data: null };
        }
    },
    Delete: async({ id }: ParticipantDelete) => {
        try{
            await db.participant.destroy({
                where: {
                    id
                }
            });

            return { result: true, message: "Delete participant success", data: null };
        }catch(error){
            return { result: false, message: error, data: null };
        }
    },
    CheckIsJoined: async({ user_id, event_id }: any) => {
        try{
            const userFound = await db.participant.findOne(
                {
                    where: {
                        user_id,
                        event_id
                    }
                }
            );

            return { result: true, message: "Check user has joined success", data: userFound };
        }catch(error){
            return { result: false, message: error, data: null };
        }
    }
}