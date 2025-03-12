import { Controller, Get, Param } from '@nestjs/common';
import { GetHouseDetailUseCase } from 'src/domain/houses/application/use-cases/get-house-detail/get-house-detail';
import { HousePresenter } from '../../presenters/house.presenter';
import { IStorageGateway } from 'src/core/enterprise/gateways/storage/storage.gateway';

@Controller('houses/detail/:houseId')
export class GetHouseDetailController {
  constructor(
    private GetHouseDetail: GetHouseDetailUseCase,
    private storageGateway: IStorageGateway,
  ) {}

  @Get()
  public async handle(@Param('houseId') houseId: string) {
    const { house } = await this.GetHouseDetail.execute({ houseId });

    house.houseImages.forEach((houseImage) => {
      houseImage.link = this.storageGateway.getPublicFileUrl(houseImage.link);
    });

    house.company.bannerCompany.link = this.storageGateway.getPublicFileUrl(
      house.company.bannerCompany.link,
    );

    return {
      house: HousePresenter.houseDetailToHTTP(house),
    };
  }
}
