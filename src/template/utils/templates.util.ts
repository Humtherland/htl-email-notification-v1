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