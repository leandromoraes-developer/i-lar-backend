import { Injectable } from '@nestjs/common';
import {
  ICoordinatesResponse,
  IGeolocationGateway,
} from 'src/core/enterprise/gateways/geolocation/geolocation.gateway';
import { IAddressDTO } from 'src/domain/houses/enterprise/dtos/address.dto';

@Injectable()
export class MockGeolocationGateway implements IGeolocationGateway {
  public async getCoordinates(
    address: IAddressDTO,
  ): Promise<ICoordinatesResponse> {
    return {
      latitude: '-20.9843294',
      longitude: '47.6812229',
    };
  }
}
