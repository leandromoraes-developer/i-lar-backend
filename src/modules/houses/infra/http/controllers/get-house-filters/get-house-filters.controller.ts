import { Controller, Get } from '@nestjs/common';
import { GetHouseFiltersUseCase } from 'src/domain/houses/application/use-cases/get-house-filters/get-house-filters';

@Controller('/house-filters')
export class GetHouseFiltersController {
  constructor(private getHouseFilters: GetHouseFiltersUseCase) {}

  @Get()
  public async handle() {
    const { houseFilters } = this.getHouseFilters.execute();

    return {
      data: houseFilters,
    };
  }
}
