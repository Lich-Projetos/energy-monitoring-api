import { Injectable } from '@nestjs/common';
import { CreateConsumptionDto } from './dto/create-consumption.dto';
import { Consumption } from './entities/consumption.entity';

@Injectable()
export class EnergyService {
  private consumptions: Consumption[] = [];

  create(dto: CreateConsumptionDto) {
    const consumption: Consumption = {
      id: Date.now().toString(),
      ...dto,
      readingDate: new Date(dto.readingDate),
    };

    this.consumptions.push(consumption);
    const alert = this.checkHighConsumption(dto.userId);

    return { message: 'Registro adicionado com sucesso.', consumption, alert };
  }

  getHistory(userId: string, start: Date, end: Date) {
    return this.consumptions.filter(
      (c) =>
        c.userId === userId &&
        c.readingDate >= start &&
        c.readingDate <= end,
    );
  }

  checkHighConsumption(userId: string): string | null {
    const userRecords = this.consumptions
      .filter((c) => c.userId === userId)
      .sort((a, b) => a.readingDate.getTime() - b.readingDate.getTime());

    if (userRecords.length < 2) return null;

    const last = userRecords[userRecords.length - 1];
    const prev = userRecords[userRecords.length - 2];

    if (last.energyConsumed > prev.energyConsumed) {
      return `⚠️ Alerta: seu consumo aumentou! Último mês: ${last.energyConsumed} kWh | Mês anterior: ${prev.energyConsumed} kWh`;
    }

    return null;
  }
}
