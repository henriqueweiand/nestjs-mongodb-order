import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async signin({ email, id }: { email: string; id: string }) {
    const payload = { sub: id, id, username: email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
