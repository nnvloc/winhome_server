import { EventSubscriber, EntitySubscriberInterface, InsertEvent, UpdateEvent } from "typeorm";
import { User } from '../users/entities/user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  /**
    * Indicates that this subscriber only listen to Post events.
    */
  listenTo() {
    return User;
  }

  
  afterInsert(event: InsertEvent<any>): Promise<any> | void {
    
  }


  afterUpdate(event: UpdateEvent<any>): Promise<any> | void {
  }
}
