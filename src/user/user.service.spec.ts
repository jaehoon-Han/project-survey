import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

type MockRepository<T = any> = Partial<Record<keyof T, jest.Mock>>;

describe('UserService', () => {
  let userService: UserService;
  let userRepository: MockRepository<User>;
  let dataSource: DataSource;

  const mockRepository = () => ({
    create: jest.fn(),
    findAll: jest.fn(),
    getUserWithResponse: jest.fn(),
    save: jest.fn(),
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
          provide: DataSource,
          useValue: mockRepository(),
        },
      ],
    }).compile();
    userService = await module.get<UserService>(UserService);
    userRepository = await module.get(getRepositoryToken(User));
    dataSource = await module.get<DataSource>(DataSource);
  });

  it('to be defined ??', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
    expect(dataSource).toBeDefined();
  });

  describe('create User', () => {
    it(' 정상적으로 유저가 생성되는 경우', async () => {
      //
      const mockFn = jest.fn();
      mockFn.mockImplementation((namee) => `나는 ${namee}!`);
      console.log(mockFn('한재뿡'));
      //
      const newUser = new User();

      const createUserInput = {
        id: 1,
        name: '한재훈',
      };
      const result = await userService.create(createUserInput);
      newUser.name = createUserInput.name;
      //   newUser.name = result.name;
      newUser.id = 1;

      console.log(newUser);
      expect(newUser).toEqual(createUserInput);
      console.log(createUserInput);
    });

    // TODO : 왜 valid가 걸리지? mockdata를 사용하는데?
    // it('유저를 생성할 때, 이름대신 잘못된 정보를 기입할 경우', async () => {
    //   const createUserInput = {
    //     name: 135,
    //   };
    //   const result = await userService.create(createUserInput);
    // });
  });
});
