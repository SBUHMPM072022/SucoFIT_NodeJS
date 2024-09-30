import db from "../models";

export const MedicalRecordService = {
    GetMedicalPercentage: async ({ medical_type }: any) => {
        try{
            let medicalRecord: any = [];

            if(medical_type == 'Blood Pressure'){
                const highBloodPressure = await db.sequelize.query(
                    `
                        select count(*) count
                        from medical_records mr 
                        where mr.systolic_blood_pressure >= 140 and mr.diastolic_blood_pressure >= 90
                    `,
                    {
                        type: db.sequelize.QueryTypes.SELECT 
                    }
                );

                const normalBloodPressure = await db.sequelize.query(
                    `
                        select count(*) count
                        from medical_records mr 
                        where (mr.systolic_blood_pressure >= 90 and mr.systolic_blood_pressure <= 120)  and (mr.diastolic_blood_pressure >= 60 and  mr.diastolic_blood_pressure <= 80)
                    `,
                    {
                        type: db.sequelize.QueryTypes.SELECT 
                    }
                );

                const lowBloodPressure = await db.sequelize.query(
                    `
                        select count(*) count
                        from medical_records mr 
                        where mr.systolic_blood_pressure < 90  and mr.diastolic_blood_pressure < 60
                    `,
                    {
                        type: db.sequelize.QueryTypes.SELECT 
                    }
                );

                medicalRecord = [
                    { name: "high", value: parseInt(highBloodPressure[0].count) },
                    { name: "normal", value: parseInt(normalBloodPressure[0].count) },
                    { name: "low", value: parseInt(lowBloodPressure[0].count) },
                ]

            }
            if(medical_type == 'Cholesterol'){
                const highCholesterol = await db.sequelize.query(
                    `
                        select count(*) count
                        from medical_records mr 
                        where mr.cholesterol >= 240
                    `,
                    {
                        type: db.sequelize.QueryTypes.SELECT 
                    }
                );

                const normalCholesterol = await db.sequelize.query(
                    `
                        select count(*) count
                        from medical_records mr 
                        where mr.cholesterol < 240
                    `,
                    {
                        type: db.sequelize.QueryTypes.SELECT 
                    }
                );

                medicalRecord = [
                    { name: "high", value: parseInt(highCholesterol[0].count) },
                    { name: "normal", value: parseInt(normalCholesterol[0].count) },
                ]

            }

            if(medical_type == 'Blood Sugar'){
                const highBloodSugar = await db.sequelize.query(
                    `
                        select count(*) count
                        from medical_records mr 
                        where mr.blood_sugar > 126
                    `,
                    {
                        type: db.sequelize.QueryTypes.SELECT 
                    }
                );

                const normalBloodSugar = await db.sequelize.query(
                    `
                        select count(*) count
                        from medical_records mr 
                        where mr.blood_sugar >= 70 and mr.blood_sugar < 126
                    `,
                    {
                        type: db.sequelize.QueryTypes.SELECT 
                    }
                );

                const lowBloodSugar = await db.sequelize.query(
                    `
                        select count(*) count
                        from medical_records mr 
                        where mr.blood_sugar < 70
                    `,
                    {
                        type: db.sequelize.QueryTypes.SELECT 
                    }
                );

                medicalRecord = [
                    { name: "high", value: parseInt(highBloodSugar[0].count) },
                    { name: "normal", value: parseInt(normalBloodSugar[0].count) },
                    { name: "low", value: parseInt(lowBloodSugar[0].count) },
                ]

            }

            return { result: true, message: "Get medical precentage success", data: medicalRecord };
        }catch(error){
            console.log(error);
            
            return { result: false, message: error, data: null };
        }
    }
}