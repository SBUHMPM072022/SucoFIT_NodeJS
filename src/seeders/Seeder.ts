import db from "../models";

export const Seeder = {
    Up: async () => {
        await db.role.sync();
        await db.role.bulkCreate([
            { 
                role: "admin"
            }, 
            { 
                role: "user",
            }
        ]);

        await db.division.sync();
        await db.division.bulkCreate([
            { 
                division_name: 'SBU HMPM',
                division_description: 'SBU HMPM PT. Sucofindo'
            }, 
            { 
                division_name: 'SBU INDUSTRI',
                division_description: 'SBU INDUSTRI'
            }, 
        ]);

        await db.event_type.sync();
        await db.event_type.bulkCreate([
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
        ]);

        await db.user.sync();
        await db.user.bulkCreate([
            { 
                fullname: "Ivan Fabriano",
                username: "ivanfabriano",
                division_id: 1,
                role_id: 1,
                email: "ivan@gmail.com",
                phone_number: "088112223334",
                password: "test123",
                created_user: "admin"
            }, 
            { 
                fullname: "Fikri Ahsanandi",
                username: "fikriahsanandi",
                division_id: 1,
                role_id: 1,
                email: "fikri@gmail.com",
                phone_number: "088112223334",
                password: "test123",
                created_user: "admin"
            }, 
            { 
                fullname: "Raisa Aliya Zahra",
                username: "raisaaliyazahra",
                division_id: 1,
                role_id: 2,
                email: "raisa@gmail.com",
                phone_number: "088112223334",
                password: "test123",
                created_user: "admin"
            }, 
        ]);

        await db.event.sync();
        await db.event.bulkCreate([
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
                pic: "Ivan Fabriano",
                location: "0",
                latitude: "0",
                longitude: "0",
                registration_start_date: "2024-08-13",
                registration_end_date: "2024-08-17",
                event_start_date: "2024-01-01",
                event_end_date: "2024-12-31",
                point: 20
            }, 
        ]);

        await db.participant.sync();
        await db.participant.bulkCreate([
            { 
                event_id: 1,
                user_id: 1,
                join_date: '2024-08-12 07:30:26.340 +0700',
                activity_start: '2024-08-14 07:21:26.340 +0700',
                activity_stop: '2024-08-14 12:21:26.340 +0700',
                presence_latitude: '0',
                presence_longitude: '0',
                participation_evidence: "activity1.jpeg",
                created_user: "admin"
            },
            { 
                event_id: 1,
                user_id: 2,
                join_date: '2024-08-11 06:30:26.340 +0700',
                activity_start: '2024-08-14 07:30:26.340 +0700',
                activity_stop: '2024-08-14 09:30:26.340 +0700',
                presence_latitude: '0',
                presence_longitude: '0',
                participation_evidence: "activity2.jpeg",
                created_user: "admin"
            }
        ]);
    },
    
    Down: async () => {
        await db.participant.truncate({ cascade: true, restartIdentity: true });
        await db.event.truncate({ cascade: true, restartIdentity: true });
        await db.user.truncate({ cascade: true, restartIdentity: true });
        await db.event_type.truncate({ cascade: true, restartIdentity: true });
        await db.division.truncate({ cascade: true, restartIdentity: true });
        await db.role.truncate({ cascade: true, restartIdentity: true });
    }
}
