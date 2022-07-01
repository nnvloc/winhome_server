
import { EntityRepository, Repository } from "typeorm";

import {
    paginate,
    Pagination,
    IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { Service } from "./entities/service.entity";
@EntityRepository(Service)
export class ServiceRepository extends Repository<Service> {
    // async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Service> {
    //     const { title, des } = createTaskDto
    //     const task = this.create({
    //         title, des,
    //         status: TaskStatus.OPEN,
    //         user: user
    //     }
    //     )
    //     await this.save(task);
    //     return task;
    // }

    //  async getTasks(filter : GetTasksFilterDTO, user: User) : Promise<Task[]>{
    //      const { status, search } = filter
    //     const query = this.createQueryBuilder('task') // lệnh query table task!
    //     query.where({ user })// thêm vào để chi query task của user = user thôi
    //     if (status) {
    //         // query.andWhere('task.status = :statusSearch', {statusSearch : status})// cách 1 : tìm task.status = biến :statusSearch, với :statusSearch sẽ là {statusSearch : status}
    //         query.andWhere('task.status = :status', { status })// cách 2 , tim status = biến status trùng tên
    //     }
    //     if (search) {
    //         //them dâu () chứa toàn bộ điều kiện là rất quan trọng vì nếu ko nó sẽ thoảt tất cả loại trử cái user ở trên!
    //         query.andWhere(('LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.des) LIKE LOWER(:search)'), 
    //         { search : `%${search}%` })
    //     }
    //     //tìm convert chử thường LOWER

    //     const tasks = await query.getMany()// query tất cả tasks ko cần condition nào! 

    //     return tasks
    //  }

    //paging
    // async getTasks(filter: GetTasksFilterDTO, user: User, options: PagingOption): Promise<Pagination<Task>> {
    //     const { status, search } = filter
    //     const query = this.createQueryBuilder('task') // lệnh query table task!
    //     query.where({ user })// thêm vào để chi query task của user = user thôi
    //     if (status) {
    //         // query.andWhere('task.status = :statusSearch', {statusSearch : status})// cách 1 : tìm task.status = biến :statusSearch, với :statusSearch sẽ là {statusSearch : status}
    //         query.andWhere('task.status = :status', { status })// cách 2 , tim status = biến status trùng tên
    //     }
    //     if (search) {
    //         //them dâu () chứa toàn bộ điều kiện là rất quan trọng vì nếu ko nó sẽ thoảt tất cả loại trử cái user ở trên!
    //         query.andWhere(('LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.des) LIKE LOWER(:search)'),
    //             { search: `%${search}%` })
    //     }
    //     //tìm convert chử thường LOWER

    //     // const tasks = await query.getMany()

    //     // return paginate<Task>
    //     return paginate<Task>(query, options);// truyền thuc hiện 
    // }
}