import { Injectable } from '@nestjs/common';
import { IHousesRepository } from 'src/domain/houses/enterprise/repositories/houses-repository';
import {
  IGetHouseDetailRequest,
  IGetHouseDetailResponse,
} from './get-house-detail.interfaces';

@Injectable()
export class GetHouseDetailUseCase {
  constructor(private housesRepository: IHousesRepository) {}

  public async execute({
    houseId,
  }: IGetHouseDetailRequest): Promise<IGetHouseDetailResponse> {
    const house = await this.housesRepository.findById(houseId);

    if (!house) {
      throw new Error('House does not found');
    }

    return {
      house,
    };
  }
}
