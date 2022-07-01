import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class HTTPAPIKeyAuthGuard extends AuthGuard('api-key') {}
