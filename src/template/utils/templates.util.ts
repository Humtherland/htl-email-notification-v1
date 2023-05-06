import { BadRequestException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

export const renameFile = (req, file, callback) => {

    const fileExtName = file.originalname.split('.')[1];
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');

    callback(null, `${randomName}-${uuid()}.${fileExtName}`);
  }

export const destinationFile = (req, file, callback) => {
    callback(null, './uploads');
}

export const  fileFilter = async (req, file, callback) => {

    if (!file.mimetype.match(/\/(html)$/)) {
        callback(new BadRequestException('Not allowed file type.'), false);
    }
    
    callback(null, true);
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
