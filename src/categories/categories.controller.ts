import { FileInterceptor } from '@nestjs/platform-express';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  UploadedFile,
  UseInterceptors,
  Query,
} from '@nestjs/common';



import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

import { StorageService } from '../storage/storage.service';


@Controller('categories')
export class CategoriesController {
  private readonly logger = new Logger(CategoriesController.name);
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly storageService: StorageService,
  ) { }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      const {
        buffer,
        originalname,
        filename,
        size,
        mimetype
      } = file;
      const params = this.storageService.prepareParams({
        body: buffer,
        key: originalname,
        group: 'categories',
      });

      await this.storageService.upload(params);
      const fileURL = this.storageService.preparePublicURL({
        key: originalname,
        group: 'categories',
      });
      createCategoryDto.image = fileURL;
    }

    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  async findAll() {
    return this.categoriesService.findAll(null);
  }


  @Get('/getCategories')
  async getCategories(
    @Query() pagingOption: IPaginationOptions,
  ) {
    console.log(pagingOption)
    return this.categoriesService.getCategories(pagingOption);

  }

  @Get(':id')
  async findOne(@Param('id') id: string | number) {
    return this.categoriesService.findOne(
      +id,
      {
        relations: ['parentCategory']
      }
    );
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      const {
        buffer,
        originalname,
        filename,
        size,
        mimetype
      } = file;
      const params = this.storageService.prepareParams({
        body: buffer,
        key: originalname,
        group: 'categories',
      });

      const response = await this.storageService.upload(params);
      const fileURL = this.storageService.preparePublicURL({
        key: originalname,
        group: 'categories',
      });
      updateCategoryDto.image = fileURL;
    }

    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
