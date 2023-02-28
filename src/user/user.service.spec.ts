import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

type MockRepository<T = any> = Partial<Record<keyof T, jest.Mock>>;

describe('UserService', () => {
  let userService: UserService;
  let userRepository: MockRepository<User>;

  const mockRepository = () => ({
    create: jest.fn(),
    findAll: jest.fn(),
    save: jest.fn(),
    getUserWithResponse: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository(),
        },
        {
          provide: EntityManager,
          useValue: mockRepository(),
        },
      ],
    }).compile();
    userService = await module.get<UserService>(UserService);
    userRepository = await module.get(getRepositoryToken(User));
    // userRepository2 = await module.get<Repository<User>>(getRepositoryToken(User))
  });

  it('to be defined ??', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('create User', () => {
    it(' 정상적으로 유저가 생성되는 경우', async () => {
      const createUserInput = {
        name: '한재훈',
      };

      const newUser = new User();
      newUser.id = 1;
      newUser.name = createUserInput.name;
      // jest.spyOn(userRepository, 'create').mockReturnValue(newUser);

      const result = await userService.create(createUserInput);
      //   newUser.name = result.name;
      newUser.id = 1;

      console.log('result의 id : ', result);
      console.log('newUser의 아이디', newUser.id);
      console.log('newUser : ', newUser);

      console.log(newUser);
      // expect(newUser).toEqual(result);
      expect(result).toEqual(newUser);
      // expect(newUser).toBe(result);
      // expect(newUser).toEqual(result);
      console.log(createUserInput);
    });
  });
});
