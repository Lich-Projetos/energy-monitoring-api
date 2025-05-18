import { Module } from '@nestjs/common';
import { EnergyService } from './energy.service';
import { EnergyController } from './energy.controller';

@Module({
  controllers: [EnergyController],
  providers: [EnergyService],
})
export class EnergyModule {}
