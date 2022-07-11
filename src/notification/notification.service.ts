import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as firebaseAdmin from 'firebase-admin';
import { firebaseCredentials } from './credentials';
import { NotificationMessage } from './notification.interfaces';


@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);
  private Notification;
  constructor(
    private readonly configService: ConfigService,
  ) {
    this.Notification = firebaseAdmin;
    this.Notification.initializeApp({
      credential: firebaseAdmin.credential.cert(firebaseCredentials),
    });
  }

  prepareMessage(data: { title: string, payload: any, body: string, token: string | string[] }) : NotificationMessage {
    return {
      data: data.payload,
      notification: {
        title: data.title,
        body: data.body
      },
      token: data.token,
    }
  }

  async sendNotification(): Promise<{success: boolean, error: string | null}> {
    try {
      const registrationToken = 'ceM2Ank7Q0ZrtzBzjkm4ag:APA91bGzFRSj8LLKBcrW50VWwKBIehwZgEt3G4LJSn3H-95RRwwBvwA8pnqaqDFY8DbUlqWOjM-awhWFtJjjPJBqlWj4fcOwmo0If8KZByt_j2kn6RGcF7x-WiN7MoGvJDV3nWW-I2c_';
      const message = this.prepareMessage({
        payload: {
          score: '850',
          time: '2:45'
        },
        title: "Hello firebase notification",
        body: "Firebase notification Hello Mr.Phung",
        token: registrationToken,
      });
      console.log('message: ', message);
      // Send a message to the device corresponding to the provided
      // registration token.
      const response = await this.Notification.messaging().send(message)
      return {success: true, error: null};
    } catch(err) {
      console.log('err');
      return { success: false, error: err };
    }
  }
}
