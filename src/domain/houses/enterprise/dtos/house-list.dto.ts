import { Category, TransactionType } from '../entities/house';

export interface IHouseListDTO {
  id: string;
  name: string;
  bathrooms: string;
  bedrooms: string;
  area: string;
  transactionType: TransactionType;
  category: Category;
  price: string;
  houseAddress: {
    number: string;
    street: string;
    neighborhood: string;
    city: string;
  };
  houseImage: {
    url: string;
    mimeType: string;
  };
}
