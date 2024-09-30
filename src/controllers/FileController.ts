import multer from 'multer';
import * as uuid from 'uuid';

export const storageUploadDocumentv2 = multer.diskStorage({
    destination: function (req, file, cb) {
        if((file.fieldname == 'file_photo_evidence' || 
            file.fieldname == 'file_photo_event_evidence' ||
            file.fieldname == 'file_photo_spot'
        ) && file) cb(null, './uploads/photos/');
    },
    filename: async function (req, file, cb) {
        const filename: string = file.originalname.replace(/[()\[\]\s]/g, '');  
        const randomString = uuid.v4();
        const newFilename = randomString + '-' + filename;

        if(file.fieldname == 'file_photo_evidence' && file){
            req.body['evidence'] = newFilename;
            cb(null, newFilename);
        }

        if(file.fieldname == 'file_photo_event_evidence' && file){
            req.body['participation_evidence'] = newFilename;
            cb(null, newFilename);
        }

        if(file.fieldname == 'file_photo_spot' && file){
            req.body['spot_photo'] = newFilename;
            cb(null, newFilename);
        }
    }
})