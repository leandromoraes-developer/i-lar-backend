import { IPaginationParamsDTO } from 'src/core/enterprise/dtos/pagination-params.dto';
import { Category, House, TransactionType } from '../entities/house';
import { IHouseListDTO } from '../dtos/house-list.dto';

export interface IFetchManyParams extends IPaginationParamsDTO {
  transactionTypes: TransactionType[];
  categories: Category[];
}

export abstract class IHousesRepository {
  abstract create(data: House): Promise<void>;
  abstract fetchMany(params: IFetchManyParams): Promise<IHouseListDTO[]>;
  abstract findById(houseId: string): Promise<House | undefined>;
}
