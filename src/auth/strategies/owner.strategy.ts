import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UsersService } from '../../users/users.service';
import { UserRole } from 'src/users/entities/user.entity';

@Injectable()
export class OwnerStrategy extends PassportStrategy(Strategy, 'jwt-owner') {
  constructor(
    private userService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { userId: number }) {
    const user = await this.userService.findById(payload.userId);
    if (user.role === UserRole.ROOM_OWNER) {
      return user;
    }
    return null;
  }
}
