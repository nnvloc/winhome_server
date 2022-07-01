import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse
} from '@nestjs/swagger';

import { HTTPAPIKeyAuthGuard } from '../auth/guards/auth-header-api-key.guard';

import { EmailService } from './email.service';
import { EmailMessage } from './email.interfaces';
import { CreateEmailDto } from './dto/create-email.dto';

@ApiTags('email')
@Controller('email')
@UseGuards(HTTPAPIKeyAuthGuard)
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @ApiOkResponse({
    description: "Send email success.",
    type: Boolean
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Post('send-email')
  async sendEmail(@Body() createEmailDto: CreateEmailDto) {
    const {
      receivers,
      subject,
      message
    } = createEmailDto;
    const emailMessage: EmailMessage = this.emailService.prepareEmailMessage({
      receivers,
      subject,
      html: message,
    });
    const {success, error} = await this.emailService.sendEmail(emailMessage);
    if (success) {
      return {
        success,
      }
    } else {
      return {
        success,
        error
      }
    }
  }
}
