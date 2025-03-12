import { Injectable } from '@nestjs/common';

import { IHousesRepository } from 'src/domain/houses/enterprise/repositories/houses-repository';
import {
  IFetchHouseRequest,
  IFetchHouseResponse,
} from './fetch-houses.interfaces';

@Injectable()
export class FetchHouseUseCase {
  constructor(private housesRepository: IHousesRepository) {}

  public async execute({
    page,
    transactionTypes,
    categories,
  }: IFetchHouseRequest): Promise<IFetchHouseResponse> {
    const houses = await this.housesRepository.fetchMany({
      page,
      transactionTypes,
      categories,
    });

    return {
      houses,
    };
  }
}
