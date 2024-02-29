import { TestingModule, Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { jest } from '@jest/globals';

describe('AuthService', () => {
    let authService: AuthService;
    let jwtServiceMock: JwtService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: JwtService,
                    useValue: {
                        signAsync: jest.fn(),
                    },
                },
            ],
        }).compile();

        authService = module.get<AuthService>(AuthService);
        jwtServiceMock = module.get<JwtService>(JwtService);
    });

    it('should sign in a user and return an access token', async () => {
        (jwtServiceMock as any).signAsync.mockResolvedValueOnce('token');

        const response = await authService.signin({
            email: 'testuser',
            id: '1',
        });

        expect(response).toEqual({ access_token: 'token' });
    });
});
