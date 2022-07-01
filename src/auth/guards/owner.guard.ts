import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OwnerGuard extends AuthGuard('jwt-owner') {}
