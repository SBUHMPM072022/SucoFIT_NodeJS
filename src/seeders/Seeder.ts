import db from "../models";

export const Seeder = {
    Up: async() => {
        db.role.sync().then(() => {
            db.role.bulkCreate([
                { 
                    role: "admin"
                }, 
                { 
                    role: "user",
                }
            ])
        });

        db.division.sync().then(() => {
            db.division.bulkCreate([
                { 
                    division_name: 'SBU HMPM',
                    division_description: 'SBU HMPM PT. Sucofindo'
                }, 
                { 
                    division_name: 'SBU INDUSTRI',
                    division_description: 'SBU INDUSTRI'
                }, 
            ])
        });

        db.event_type.sync().then(() => {
            db.event_type.bulkCreate([
                { 
                    event_type: "Futsal",
                    event_type_description: "Olahraga Futsal"
                }, 
                { 
                    event_type: "Badminton",
                    event_type_description: "Olahraga Badminton"
                }, 
                { 
                    event_type: "Basketball",
                    event_type_description: "Olahraga Basketball"
                }, 
            ])
        });

        db.event.sync().then(() => {
            db.event.bulkCreate([
                { 
                    event_name: "Badminton HMPM",
                    event_description: "Badminton HMPM setiap minggu seru banget",
                    event_type_id: 2,
                    pic: "Ivan Fab",
                    location: "0",
                    latitude: "0",
                    longitude: "0",
                    registration_start_date: "2024-08-13",
                    registration_end_date: "2024-08-17",
                    event_start_date: "2024-01-01",
                    event_end_date: "2024-12-31",
                    point: 10
                }, 
                { 
                    event_name: "Futsal HMPM",
                    event_description: "Futsal HMPM setiap minggu seru aja",
                    event_type_id: 1,
                    pic: "Ivan fabriano",
                    location: "0",
                    latitude: "0",
                    longitude: "0",
                    registration_start_date: "2024-08-13",
                    registration_end_date: "2024-08-17",
                    event_start_date: "2024-01-01",
                    event_end_date: "2024-12-31",
                    point: 20
                }, 
            ])
        });

        db.user.sync().then(() => {
            db.user.bulkCreate([
                { 
                    fullname: "Ivan Fabriano",
                    division_id: 1,
                    role_id: 1,
                    email: "ivan@gmail.com",
                    phone_number: "088112223334",
                    password: "test123",
                    created_user: "admin"
                }, 
                { 
                    fullname: "Fikri Ahsanandi",
                    division_id: 1,
                    role_id: 1,
                    email: "fikri@gmail.com",
                    phone_number: "088112223334",
                    password: "test123",
                    created_user: "admin"
                }, 
                { 
                    fullname: "Raisa Aliya Zahra",
                    division_id: 1,
                    role_id: 2,
                    email: "raisa@gmail.com",
                    phone_number: "088112223334",
                    password: "test123",
                    created_user: "admin"
                }, 
            ])
        });

        db.participant.sync().then(() => {
            db.participant.bulkCreate([
                { 
                    event_id: 1,
                    user_id: 1,
                    join_date: '2024-08-12T07:30:00Z',
                    activity_start: '2024-08-14T07:30:00Z',
                    activity_stop: '2024-08-14T012:30:00Z',
                    presence_latitude: '0',
                    presence_longitude: '0',
                    participant_evidence: "",
                    created_user: "admin"
                }
            ])
        });
    },
    
    Down: async() => {
        await db.division.truncate({ cascade: true, restartIdentity: true });
        await db.role.truncate({ cascade: true, restartIdentity: true });
        await db.event_type.truncate({ cascade: true, restartIdentity: true });
        await db.event.truncate({ cascade: true, restartIdentity: true });
        await db.user.truncate({ cascade: true, restartIdentity: true });
    }
}
