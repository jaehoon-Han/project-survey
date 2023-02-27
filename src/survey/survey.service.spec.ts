import { Test, TestingModule } from '@nestjs/testing';
import { SurveyService } from './survey.service';
import { DataSource, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Survey } from './entities/survey.entity';

type MockRepository<T = any> = Partial<Record<keyof T, jest.Mock>>;

const mockSurveyRepository = {
  create: jest.fn().mockReturnValue({}),
  save: jest.fn(),
  findOne: jest.fn(),
};

describe('SurveyService', () => {
  let surveyService: SurveyService;
  let surveyRepository: Repository<Survey>;
  let mockSurveyRepo: MockRepository<Survey>;
  let dataSource: DataSource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SurveyService,
        {
          provide: getRepositoryToken(Survey),
          useValue: mockSurveyRepository,
        },
        {
          provide: DataSource,
          useValue: mockSurveyRepository,
        },
      ],
    }).compile();

    surveyService = module.get<SurveyService>(SurveyService);
    dataSource = module.get<DataSource>(DataSource);
    mockSurveyRepo = module.get<MockRepository<Survey>>(
      getRepositoryToken(Survey),
    );
    surveyRepository = module.get<Repository<Survey>>(
      getRepositoryToken(Survey),
    );
  });

  it('to be defined ??', () => {
    expect(surveyRepository).toBeDefined();
    expect(surveyService).toBeDefined();
    expect(dataSource).toBeDefined();
    expect(mockSurveyRepo).toBeDefined();
  });

  it('정상적으로 설문이 생성되는 경우', async () => {
    const newSurvey = new Survey();
    const createSurveyInput = {
      title: 'My Survey',
      description: 'This is my survey',
    };
    const result = await surveyService.create(createSurveyInput);
    const surveyRepositorySaveSpy = jest
      .spyOn(surveyRepository, 'save')
      .mockResolvedValue(newSurvey);
    console.log('surveyRepoSaveSpy : ', surveyRepositorySaveSpy);

    newSurvey.title = createSurveyInput.title;
    newSurvey.description = createSurveyInput.description;
    newSurvey.amountQuestion = 0;

    // const saveSpy = jest.spyOn(mockSurveyRepository, 'save');

    expect(newSurvey.amountQuestion).toBe(0);

    // const saveSpy = jest.spyOn(surveyRepository, 'save');
    // console.log('saveSpy : ', saveSpy);
    expect(result).toEqual(newSurvey);
    // expect(saveSpy).toHaveBeenCalled();
    // expect(saveSpy).toHaveBeenCalledWith(newSurvey);
    // expect(saveSpy).toHaveBeenCalledWith(result);
  });

  it('title이나 describe를 입력하지 않았을 때 예외를 던진다', async () => {
    const id = 1;
    const createSurveyInput = {
      title: '',
      description: '',
    };
  });
});

// import { Repository } from 'typeorm';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { SurveyService } from 'src/survey/survey.service';
// import { Survey } from 'src/survey/entities/survey.entity';
// import { CreateSurveyInput } from 'src/survey/dto/create-survey.input';
// import { Test, TestingModule } from '@nestjs/testing';

// describe('SurveyService', () => {
//   let service: SurveyService;
//   let repository: Repository<Survey>;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         SurveyService,
//         {
//           provide: getRepositoryToken(Survey),
//           useClass: Repository,
//         },
//       ],
//     }).compile();

//     service = module.get<SurveyService>(SurveyService);
//     repository = module.get<Repository<Survey>>(getRepositoryToken(Survey));
//   });

//   describe('create', () => {
//     it('should create a new survey', async () => {
//       const surveyInput: CreateSurveyInput = { title: 'Survey 1' };

//       // Create a mock survey that the repository's save method will return
//       const mockSurvey = new Survey();
//       mockSurvey.id = 1;
//       mockSurvey.title = surveyInput.title;
//       mockSurvey.amountQuestion = 0;
//       jest.spyOn(repository, 'create').mockReturnValue(mockSurvey);
//       jest.spyOn(repository, 'save').mockResolvedValue(mockSurvey);

//       // Call the service's create method with the input
//       const result = await service.create(surveyInput);

//       // Check that the repository's create and save methods were called with the correct arguments
//       expect(repository.create).toHaveBeenCalledWith(surveyInput);
//       expect(repository.save).toHaveBeenCalledWith(mockSurvey);

//       // Check that the result returned by the service is the same as the mock survey returned by the repository
//       expect(result).toEqual(mockSurvey);
//     });
//   });
// });
