import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { FetchHouseUseCase } from 'src/domain/houses/application/use-cases/fetch-houses/fetch-houses';
import { HousePresenter } from '../../presenters/house.presenter';
import { ParseTransactionTypePipe } from '../../pipes/parse-transaction-type-pipe';
import {
  Category,
  TransactionType,
} from 'src/domain/houses/enterprise/entities/house';
import { CategoryPipe } from '../../pipes/category-pipe';
import { IStorageGateway } from 'src/core/enterprise/gateways/storage/storage.gateway';

@Controller('/houses')
export class FetchHousesController {
  constructor(
    private fetchHouses: FetchHouseUseCase,
    private storageGateway: IStorageGateway,
  ) {}

  @Get()
  public async handle(
    @Query('page', ParseIntPipe) page: number,
    @Query('transactionTypes', ParseTransactionTypePipe)
    transactionTypes: TransactionType[],
    @Query('categories', CategoryPipe)
    categories: Category[],
  ) {
    const { houses } = await this.fetchHouses.execute({
      page,
      transactionTypes,
      categories,
    });

    houses.forEach((house) => {
      house.houseImage.url = this.storageGateway.getPublicFileUrl(
        house.houseImage.url,
      );
    });

    const hasNextPage = houses.length === 12;

    return {
      data: houses.map(HousePresenter.houseListtoHTTP),
      hasNextPage,
      nextPage: hasNextPage ? page + 1 : undefined,
    };
  }
}
