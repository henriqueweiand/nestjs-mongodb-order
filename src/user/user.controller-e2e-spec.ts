import { DatabaseService } from '@app/core/database/database.service';
import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';
import { AppModule } from '@app/app.module';
import request from 'supertest';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersController', () => {
    let dbConnection: Connection;
    let httpServer: any;
    let app: any;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleRef.createNestApplication();
        await app.init();
        dbConnection = moduleRef
            .get<DatabaseService>(DatabaseService)
            .getDbHandle();
        httpServer = app.getHttpServer();
    });

    beforeEach(async () => {
        await dbConnection.collection('users').deleteMany({});
    });

    afterAll(async () => {
        await app.close();
    });

    describe('UserController', () => {
        it('should create user', async () => {
            const createDto: CreateUserDto = {
                email: 'email@teste.com',
                password: 'teste123',
            };
            const response = await request(httpServer)
                .post('/user/signup')
                .send(createDto);

            expect(response.status).toBe(201);
            expect(response.body.email).toEqual(createDto.email);

            const user = await dbConnection
                .collection('users')
                .findOne({ email: createDto.email });
            expect(user.email).toEqual(createDto.email); // compare only the email
        });
    });
});
