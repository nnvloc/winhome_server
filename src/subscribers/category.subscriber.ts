import { EventSubscriber, EntitySubscriberInterface, InsertEvent, UpdateEvent } from "typeorm";
import { Category } from '../categories/entities/category.entity';

@EventSubscriber()
export class CategorySubscriber implements EntitySubscriberInterface<Category> {
  /**
    * Indicates that this subscriber only listen to Post events.
    */
  listenTo() {
    return Category;
  }

  
  afterInsert(event: InsertEvent<any>): Promise<any> | void {
    // TODO: Should add try catch and logger to log the error
    const repository = event.manager.getRepository(Category);
    const entity = event.entity;
    if (entity.isDefault) {
      return;
    }

    const defaultCategoryData = {
      name: `${entity.id}-default-sub-cat`,
      status: 1,
      parentCategoryId: entity.id,
      isDefault: true,
    }

    const defaultCategory = repository.create(defaultCategoryData);
    repository.save(defaultCategory);
  }


  afterUpdate(event: UpdateEvent<any>): Promise<any> | void {
  }
}
