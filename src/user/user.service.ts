import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { AuthService } from '@app/core/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private authModel: Model<User>,
    private authService: AuthService,
  ) {}

  signup({ email, password }: CreateUserDto): Promise<User> {
    const createdUser = new this.authModel({ email, password });
    return createdUser.save();
  }

  async signin({ email, password }: CreateUserDto) {
    const user = await this.findOneByEmail(email);

    if (user?.password !== password) {
      throw new UnauthorizedException();
    }

    return this.authService.signin({ email, id: user.id });
  }

  findAll(): Promise<User[]> {
    return this.authModel.find().exec();
  }

  findOneByEmail(email: string) {
    return this.authModel
      .findOne({
        email,
      })
      .exec();
  }
}
