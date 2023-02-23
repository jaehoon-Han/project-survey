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

    newSurvey.title = createSurveyInput.title;
    newSurvey.description = createSurveyInput.description;
    newSurvey.amountQuestion = 0;

    const saveSpy = jest.spyOn(mockSurveyRepository, 'save');

    expect(newSurvey.amountQuestion).toBe(0);

    // const saveSpy = jest.spyOn(surveyRepository, 'save');
    // console.log('saveSpy : ', saveSpy);
    // expect(result).toEqual(newSurvey);
    // expect(saveSpy).toHaveBeenCalled();
    // expect(saveSpy).toHaveBeenCalledWith(newSurvey);
    expect(saveSpy).toHaveBeenCalledWith(result);
  });
});
