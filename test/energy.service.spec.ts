import { Test, TestingModule } from '@nestjs/testing';
import { EnergyService } from '../../src/energy/energy.service';

describe('EnergyService', () => {
  let service: EnergyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnergyService],
    }).compile();

    service = module.get<EnergyService>(EnergyService);
  });

  it('deve criar um novo registro de consumo', () => {
    const dto = {
      userId: 'user1',
      energyConsumed: 120,
      readingDate: '2024-05-01',
    };

    const result = service.create(dto);
    expect(result.consumption.energyConsumed).toBe(120);
  });
});
