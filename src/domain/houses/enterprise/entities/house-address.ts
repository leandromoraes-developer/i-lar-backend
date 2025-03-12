import { BaseEntity } from 'src/core/enterprise/entities/base-entity';
import { UniqueEntityId } from 'src/core/enterprise/object-value/unique-entity-id';

interface IHouseAddressProps {
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  houseId: UniqueEntityId;
  state: string;
  postalCode: string;
  latitude: string;
  longitude: string;
}

export class HouseAddress extends BaseEntity<IHouseAddressProps> {
  get street(): string {
    return this.props.street;
  }

  get number(): string {
    return this.props.number;
  }

  get neighborhood(): string {
    return this.props.neighborhood;
  }

  get city(): string {
    return this.props.city;
  }

  get state(): string {
    return this.props.state;
  }

  get postalCode(): string {
    return this.props.postalCode;
  }

  get latitude(): string {
    return this.props.latitude;
  }

  get longitude(): string {
    return this.props.longitude;
  }

  get houseId(): string {
    return this.props.houseId.toValue();
  }

  public toString(): string {
    return `${this.props.street}, ${this.props.number}, ${this.props.neighborhood}, ${this.props.city} - ${this.props.state}, ${this.props.postalCode}`;
  }

  static create(
    props: IHouseAddressProps,
    houseAddressId?: UniqueEntityId,
  ): HouseAddress {
    return new HouseAddress(props, houseAddressId);
  }
}
