import { HouseImage as PrismaHouseImage } from '@prisma/client';
import { UniqueEntityId } from 'src/core/enterprise/object-value/unique-entity-id';
import { HouseImage } from 'src/domain/houses/enterprise/entities/house-image';

export class PrismaHouseImagesMapper {
  static toPrisma(data: HouseImage): PrismaHouseImage {
    return {
      fileName: data.fileName,
      houseId: data.houseId?.toString() ?? null,
      id: data.id,
      mimeType: data.mimeType,
      url: data.link,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  static toDomain(row: PrismaHouseImage): HouseImage {
    return HouseImage.create(
      {
        fileName: row.fileName,
        houseId: row.houseId ? new UniqueEntityId(row.houseId) : undefined,
        link: row.url,
        mimeType: row.mimeType,
      },
      new UniqueEntityId(row.id),
    );
  }
}
