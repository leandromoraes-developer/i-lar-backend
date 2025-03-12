import { HouseImage } from '../entities/house-image';

export abstract class IHouseImagesRepository {
  abstract createMany(houseImages: HouseImage[]): Promise<void>;
  abstract findByIds(imageIds: string[]): Promise<HouseImage[]>;
  abstract saveMany(images: HouseImage[]): Promise<void>;
}
