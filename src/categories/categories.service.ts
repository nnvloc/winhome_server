import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PartialType } from '@nestjs/mapped-types';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';


import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private repository: Repository<Category>,
  ) { }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const { image = '', ...params } = createCategoryDto;
    const category = this.repository.create({ ...params, imageUrl: image });
    await this.repository.save(category);
    return category.toJSON();
  }

  async findAll(filters: any): Promise<Category[]> {
    return this.repository.find(filters);
  }

  async getCategories(options: IPaginationOptions): Promise<Pagination<Category>> {
    return paginate<Category>(this.repository, options);
  }

  async findOne(id: number, options: any): Promise<Category> {
    return this.repository.findOne(
      id,
      {
        ...options
      }
    );
  }

  async update(id: Number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const { image = '', ...params } = updateCategoryDto;
    delete params.id;
    return this.repository.save({ id, ...params, imageUrl: image });
  }

  async remove(id: number): Promise<any> {
    return this.repository.softDelete(id);
  }
}
