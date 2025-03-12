import { IAddressDTO } from 'src/domain/houses/enterprise/dtos/address.dto';
import {
  Category,
  House,
  TransactionType,
} from 'src/domain/houses/enterprise/entities/house';

export interface IRegisterHouseRequest {
  name: string;
  description: string;
  companyId: string;
  category: Category;
  transactionType: TransactionType;
  bedrooms: string;
  bathrooms: string;
  area: string;
  price: string;
  address: IAddressDTO;
  houseImageIds: string[];
}

export interface IRegisterHouseResponse {
  house: House;
}
