import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request, UseInterceptors, UploadedFiles, Req, Put, Query, DefaultValuePipe, ParseIntPipe, NotFoundException, BadRequestException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('invoices')
@Controller('invoices')
export class InvoicesController {
  constructor() {}

  
}
