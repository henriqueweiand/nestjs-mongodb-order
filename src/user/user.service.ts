import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { AuthService } from '@app/core/auth/auth.service';
import { PaginationQueryDto } from '@app/core/common/dto/pagination-query.dto';
import * as bcrypt from 'bcrypt';

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

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException();
        }

        return this.authService.signin({ email, id: user.id });
    }

    findAll(paginationQuery: PaginationQueryDto): Promise<User[]> {
        const { limit, offset } = paginationQuery;

        return this.authModel
            .find()
            .populate(['orders'])
            .skip(offset)
            .limit(limit)
            .exec();
    }

    findOneByEmail(email: string) {
        return this.authModel
            .findOne({
                email,
            })
            .exec();
    }

    pushOrder(
        userId: string | mongoose.Types.ObjectId,
        orderId: string | mongoose.Types.ObjectId,
    ) {
        return this.authModel
            .updateOne(
                {
                    _id: userId,
                },
                {
                    $push: {
                        orders: orderId,
                    },
                },
            )
            .exec();
    }
}
