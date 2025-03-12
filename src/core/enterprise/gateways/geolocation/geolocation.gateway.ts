import { IAddressDTO } from 'src/domain/houses/enterprise/dtos/address.dto';

export interface ICoordinatesResponse {
  longitude: string;
  latitude: string;
}

export abstract class IGeolocationGateway {
  abstract getCoordinates(address: IAddressDTO): Promise<ICoordinatesResponse>;
}
