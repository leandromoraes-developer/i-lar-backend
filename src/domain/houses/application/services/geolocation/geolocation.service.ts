import { IGeolocationGateway } from 'src/core/enterprise/gateways/geolocation/geolocation.gateway';
import { IAddressDTO } from '../../../enterprise/dtos/address.dto';
import { IGeolocationRequest } from './geolocation.interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GeolocationService {
  constructor(private geolocationGateway: IGeolocationGateway) {}
  public async resolveCoordinates(
    address: IAddressDTO,
  ): Promise<IGeolocationRequest> {
    const { latitude, longitude } =
      await this.geolocationGateway.getCoordinates(address);

    return {
      latitude,
      longitude,
    };
  }
}
