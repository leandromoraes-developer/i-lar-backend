import { IHouseFilter } from 'src/domain/houses/enterprise/dtos/house-filter.dto';
import {
  Category,
  TransactionType,
} from 'src/domain/houses/enterprise/entities/house';
import { IGetHouseFiltersUseCaseResponse } from './get-house-filters.interfaces';
import { Injectable } from '@nestjs/common';
import { LABEL_HOUSE_FILTERS } from 'src/core/enterprise/constants/label-house-filters.enum';

@Injectable()
export class GetHouseFiltersUseCase {
  public execute(): IGetHouseFiltersUseCaseResponse {
    const houseFilters: IHouseFilter[] = [];
    Object.values(TransactionType).map((transtactions) => {
      houseFilters.push({
        key: 'transaction_type',
        value: transtactions,
        label: LABEL_HOUSE_FILTERS[transtactions],
      });
    });

    Object.values(Category).map((category) => {
      houseFilters.push({
        key: 'category_type',
        value: category,
        label: LABEL_HOUSE_FILTERS[category],
      });
    });

    return { houseFilters };
  }
}
