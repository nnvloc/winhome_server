import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as sgMail from '@sendgrid/mail';

import { EmailMessage } from './email.interfaces';

@Injectable()
export class EmailService {
  private mailer;
  private sender;
  private NODE_ENV;
  private readonly logger = new Logger(EmailService.name);
  constructor(
    private readonly configService: ConfigService,
  ) {
    this.mailer = sgMail;
    this.mailer.setApiKey(this.configService.get('SENDGRID_API_KEY'));
    this.sender = this.configService.get('SENDGRID_SENDER');
    this.NODE_ENV = this.configService.get('NODE_ENV');
  }

  prepareEmailMessage(data: {receivers: string | string[], subject: string, html?: string, text?: string}) : EmailMessage {
    return {
      from: this.sender,
      to: data.receivers,
      html: data.html,
      subject: data.subject,
    };
  }

  async sendEmail(msg: EmailMessage): Promise<{success: boolean, error: string | null}> {
    try {
      const response = await this.mailer.send(msg);
      // We can do log to log central here before return the data
      return {success: true, error: null};
    } catch(err) {
      const errorBody = err?.response?.body;
      const errors = errorBody?.errors;
      const message = errors[0]?.message;
      // We can do log to log central here before return the data
      return {success: false, error: message ?? 'Something went wrong. Please try again later.'};
    }
  } 
}
