import { BaseEntity } from 'src/core/enterprise/entities/base-entity';
import { UniqueEntityId } from 'src/core/enterprise/object-value/unique-entity-id';
import { HouseAddress } from './house-address';
import { HouseImage } from './house-image';
import { Company } from 'src/domain/companies/enterprise/entities/company';

export enum TransactionType {
  SALE = 'SALE',
  RENT = 'RENT',
}

export enum Category {
  //APARTMENT = 'APARTMENT',
  HOUSE = 'HOUSE',
  LAND = 'LAND',
}

interface IHouseProps {
  name: string;
  description: string;
  company: Company;
  bathrooms: string;
  bedrooms: string;
  area: string;
  transactionType: TransactionType;
  category: Category;
  price: string;
  houseAddress?: HouseAddress;
  houseImages?: HouseImage[];
  createdAt?: Date;
  updatedAt?: Date;
}

export class House extends BaseEntity<IHouseProps> {
  get name(): string {
    return this.props.name;
  }

  get description(): string {
    return this.props.description;
  }

  get company(): Company {
    return this.props.company;
  }

  get bathrooms(): string {
    return this.props.bathrooms;
  }

  get bedrooms(): string {
    return this.props.bedrooms;
  }

  get area(): string {
    return this.props.area;
  }

  get transactionType(): TransactionType {
    return this.props.transactionType;
  }

  get category(): Category {
    return this.props.category;
  }

  get price(): string {
    return this.props.price;
  }

  get houseAddress(): HouseAddress | undefined {
    return this.props.houseAddress;
  }

  get houseImages(): HouseImage[] {
    return this.props.houseImages || [];
  }

  public updateAddress(address: HouseAddress): void {
    this.props.houseAddress = address;
  }

  public addImage(image: HouseImage): void {
    if (image.houseId) {
      throw new Error(
        `Image ${image.id} is already associated with another house`,
      );
    }
    this.props.houseImages = [...(this.props.houseImages || []), image];
  }

  public addCompany(company: Company) {
    this.props.company = company;
  }

  static create(props: IHouseProps, id?: UniqueEntityId): House {
    return new House(
      {
        ...props,
        createdAt: props.createdAt || new Date(),
        updatedAt: props.updatedAt || new Date(),
      },
      id,
    );
  }
}
