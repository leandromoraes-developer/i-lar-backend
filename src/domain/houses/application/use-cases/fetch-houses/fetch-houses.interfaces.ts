import { IHouseListDTO } from 'src/domain/houses/enterprise/dtos/house-list.dto';
import {
  Category,
  TransactionType,
} from 'src/domain/houses/enterprise/entities/house';

export interface IFetchHouseRequest {
  page: number;
  transactionTypes: TransactionType[];
  categories: Category[];
}

export interface IFetchHouseResponse {
  houses: IHouseListDTO[];
}
