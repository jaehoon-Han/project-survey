import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockRepo, mockUser } from 'src/common/___test___/mock';
import { EntityManager, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

const mockRepository = MockRepo;

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>;
  let entityManager: EntityManager;

  const createUserInput = { name: 'Test Name' };

  const user = mockUser();

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
    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    entityManager = module.get<EntityManager>(EntityManager);
  });

  it('TO BE DEFINED ?', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
    expect(entityManager).toBeDefined();
  });

  describe('create User', () => {
    it(' 정상적으로 유저가 생성되는 경우', async () => {
      // Arrange
      jest.spyOn(userRepository, 'create').mockReturnValueOnce(user);
      jest.spyOn(userRepository, 'save').mockResolvedValue(user);

      // Act
      const result = await service.create(createUserInput);

      // Assert
      expect(userRepository.create).toHaveBeenCalledWith(createUserInput);
      expect(userRepository.save).toHaveBeenCalledWith(user);
    });
  });
});
