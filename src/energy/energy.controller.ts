import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { EnergyService } from './energy.service';
import { CreateConsumptionDto } from './dto/create-consumption.dto';

@Controller('energy')
export class EnergyController {
  constructor(private readonly service: EnergyService) {}

  @Post('register')
  register(@Body() dto: CreateConsumptionDto) {
    return this.service.create(dto);
  }

  @Get('history')
  history(
    @Query('userId') userId: string,
    @Query('start') start: string,
    @Query('end') end: string,
  ) {
    return this.service.getHistory(userId, new Date(start), new Date(end));
  }
}
