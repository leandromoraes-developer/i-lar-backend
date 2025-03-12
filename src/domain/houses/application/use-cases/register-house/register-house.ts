import { House } from 'src/domain/houses/enterprise/entities/house';

import { ICompaniesRepository } from 'src/domain/companies/enterprise/repositories/companies-repository';
import { IHousesRepository } from 'src/domain/houses/enterprise/repositories/houses-repository';

import {
  IRegisterHouseRequest,
  IRegisterHouseResponse,
} from './register-house.interfaces';
import { Company } from 'src/domain/companies/enterprise/entities/company';
import { HouseAddress } from 'src/domain/houses/enterprise/entities/house-address';
import { HouseImage } from 'src/domain/houses/enterprise/entities/house-image';
import { IHouseImagesRepository } from 'src/domain/houses/enterprise/repositories/house-images.repository';
import { Injectable } from '@nestjs/common';
import { UniqueEntityId } from 'src/core/enterprise/object-value/unique-entity-id';
import { IGeolocationGateway } from 'src/core/enterprise/gateways/geolocation/geolocation.gateway';

@Injectable()
export class RegisterHouseUseCase {
  constructor(
    private housesRepository: IHousesRepository,
    private companiesRepository: ICompaniesRepository,
    private houseImageRepository: IHouseImagesRepository,
    private geolocationService: IGeolocationGateway,
  ) {}

  public async execute({
    address,
    area,
    bathrooms,
    bedrooms,
    category,
    companyId,
    description,
    name,
    price,
    transactionType,
    houseImageIds,
  }: IRegisterHouseRequest): Promise<IRegisterHouseResponse> {
    const company = await this.checkIsCompanyExist(companyId);

    if (!company) {
      throw new Error('Company does not found');
    }

    const houseImages = await this.validateAndRetrieveImages(houseImageIds);

    const houseCoordinates =
      await this.geolocationService.getCoordinates(address);

    if (!houseCoordinates) {
      throw new Error('Cordinate does not found');
    }

    const house = House.create({
      area,
      bathrooms,
      description,
      bedrooms,
      company,
      name,
      price,
      transactionType,
      category,
    });

    houseImages.forEach((image) => {
      house.addImage(image);
    });

    const houseAddress = HouseAddress.create({
      ...address,
      latitude: houseCoordinates.latitude.toString(),
      longitude: houseCoordinates.longitude.toString(),
      houseId: new UniqueEntityId(house.id),
    });

    house.updateAddress(houseAddress);

    await this.housesRepository.create(house);

    return {
      house,
    };
  }

  private async checkIsCompanyExist(companyId: string): Promise<Company> {
    const companyExists = await this.companiesRepository.findById(companyId);
    if (!companyExists) {
      throw new Error('Company does not exist');
    }
    return companyExists;
  }

  private async validateAndRetrieveImages(
    imageIds: string[],
  ): Promise<HouseImage[]> {
    const images = await this.houseImageRepository.findByIds(imageIds);

    if (!images) {
      throw new Error('No images were found for this house');
    }

    if (images.length !== imageIds.length) {
      throw new Error('Some images could not be found');
    }

    return images;
  }
}
