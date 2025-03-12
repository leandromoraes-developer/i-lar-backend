import { IHouseImagesRepository } from 'src/domain/houses/enterprise/repositories/house-images.repository';
import {
  IUploadImagesHouseRequest,
  IUploadImagesHouseResponse,
} from './upload-images-house.interfaces';
import { IStorageGateway } from 'src/core/enterprise/gateways/storage/storage.gateway';
import { HouseImage } from 'src/domain/houses/enterprise/entities/house-image';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UplaodImagesHouseUseCase {
  constructor(
    private houseImagesRepository: IHouseImagesRepository,
    private storageGateway: IStorageGateway,
  ) {}

  public async execute({
    images,
  }: IUploadImagesHouseRequest): Promise<IUploadImagesHouseResponse> {
    const houseImages = await Promise.all(
      images.map(async (image) => {
        const { url } = await this.storageGateway.uploader({
          body: image.buffer,
          fileName: image.fileName,
          fileType: image.mimeType,
          folder: 'house-images',
        });

        return HouseImage.create({
          fileName: image.fileName,
          houseId: null,
          link: url,
          mimeType: image.mimeType,
        });
      }),
    );

    await this.houseImagesRepository.createMany(houseImages);

    return {
      houseImageIds: houseImages.map((houseImage) => houseImage.id),
    };
  }
}
