import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { IHouseImagesRepository } from 'src/domain/houses/enterprise/repositories/house-images.repository';
import { HouseImage } from 'src/domain/houses/enterprise/entities/house-image';
import { PrismaHouseImagesMapper } from '../mappers/prisma-house-images.mapper';

@Injectable()
export class PrismaHouseImagesRepository implements IHouseImagesRepository {
  constructor(private prismaService: PrismaService) {}

  public async createMany(houseImages: HouseImage[]): Promise<void> {
    const data = houseImages.map(PrismaHouseImagesMapper.toPrisma);

    await this.prismaService.houseImage.createMany({
      data,
    });
  }

  public async findByIds(imageIds: string[]): Promise<HouseImage[]> {
    const images = await this.prismaService.houseImage.findMany({
      where: {
        id: {
          in: imageIds,
        },
      },
    });

    if (images.length === 0) return null;

    return images.map(PrismaHouseImagesMapper.toDomain);
  }

  public async saveMany(images: HouseImage[]): Promise<void> {
    const data = images.map(PrismaHouseImagesMapper.toPrisma);

    await this.prismaService.houseImage.updateMany({
      data,
    });
  }
}
