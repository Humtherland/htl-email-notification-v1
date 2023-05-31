import { BadRequestException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import * as fs from 'fs';

export const renameFile = (req, file, callback) => {
    
    let fileName = '';

    do {
        fileName = generateRandomName(file.originalname);
    } while (fs.existsSync(`./uploads/${fileName}`));
    
    callback(null, fileName);
  }

export const destinationFile = (req, file, callback) => {
    callback(null, './uploads');
}

export const  fileFilter = async (req, file, callback) => {
    let validTypes = [
        'image/png', 
        'image/jpg', 
        'image/jpeg', 
        'application/pdf'
    ];
    
    if (!validTypes.includes(file.mimetype)) {
        return callback(new BadRequestException('Not allowed file type.'), false);
    }
    
    return callback(null, true);
}

export function returnBytes(bytesConvert: string) {
    const numericValue = parseInt(bytesConvert);
    const unit = bytesConvert.substring(numericValue.toString().length);
    const byteTypes = {
        'KB': 1,
        'MB': 2,
        'GB': 3,
        'TB': 4,
        'PB': 5,
        'EB': 6,
        'ZB': 7,
        'YB': 8,
        'BB': 9,
        'NB': 10,
        'DB': 11,
        'CB': 12,
        'XB': 13,
    }

    if (byteTypes[unit] === undefined) {
        throw new Error('Invalid binary number type.');
    }
    
    return numericValue * Math.pow(1024, byteTypes[unit]);
}
function generateRandomName(originalname: string) {
    const fileExtName = originalname.split('.').slice(-1)[0];
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    
    return `${randomName}-${uuid()}.${fileExtName}`;
}

