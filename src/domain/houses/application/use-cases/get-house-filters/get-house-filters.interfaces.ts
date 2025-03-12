import { IHouseFilter } from 'src/domain/houses/enterprise/dtos/house-filter.dto';

export interface IGetHouseFiltersUseCaseResponse {
  houseFilters: IHouseFilter[];
}
