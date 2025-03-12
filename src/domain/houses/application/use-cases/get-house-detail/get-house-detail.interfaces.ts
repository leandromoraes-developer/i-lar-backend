import { House } from 'src/domain/houses/enterprise/entities/house';

export interface IGetHouseDetailRequest {
  houseId: string;
}

export interface IGetHouseDetailResponse {
  house: House;
}
