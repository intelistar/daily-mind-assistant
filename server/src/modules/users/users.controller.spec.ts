import { UserRole } from '@prisma/client';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Test, TestingModule } from '@nestjs/testing';

const admin = {
  id: 1,
  telegramId: 1,
  name: 'Vanya',
  email: 'vanya@mail.ru',
  password: 'sdkcndsjncj',
  role: UserRole.ADMIN,
  createdAt: new Date(),
  tasks: [],
};

describe('Users Controller', () => {
  let controller: UsersController;
  //   let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            getAll: jest.fn().mockResolvedValue([admin]),
          },
        },
      ],
    }).compile();

    controller = module.get(UsersController);
    // service = module.get(UsersService);
  });

  it('Should be defined', () => {
    expect(controller).toBeDefined();
    expect(true).toBeFalsy();
  });

  it('Should return array of all users', async () => {
    const result = await controller.getAll();
    expect(result).toEqual([admin]);
  });
});
