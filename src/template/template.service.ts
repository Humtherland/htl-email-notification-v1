import { Injectable } from '@nestjs/common';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import * as multer from 'multer';
import { postProcessing } from './utils/post-processing.util';

@Injectable()
export class TemplateService {

  create(file: Express.Multer.File) {    
    postProcessing(file.path);
    return {
      templateId: file.filename.split('.')[0],
    };
  }

  findAll() {
    return `This action returns all template`;
  }

  findOne(id: number) {
    return `This action returns a #${id} template`;
  }

  update(id: number, updateTemplateDto: UpdateTemplateDto) {
    return `This action updates a #${id} template`;
  }

  remove(id: number) {
    return `This action removes a #${id} template`;
  }
}
