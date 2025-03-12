import { HouseAddress as PrismaHouseAddress } from '@prisma/client';
import { UniqueEntityId } from 'src/core/enterprise/object-value/unique-entity-id';
import { HouseAddress } from 'src/domain/houses/enterprise/entities/house-address';

export class PrismaHouseAddressMapper {
  static toPrisma(data: HouseAddress): PrismaHouseAddress {
    return {
      city: data.city,
      createdAt: new Date(),
      houseId: data.houseId,
      id: data.id,
      latitude: data.latitude,
      longitude: data.longitude,
      neighborhood: data.neighborhood,
      number: data.number,
      postalCode: data.postalCode,
      state: data.state,
      street: data.street,
      updatedAt: new Date(),
    };
  }

  static toDomain(row: PrismaHouseAddress): HouseAddress {
    return HouseAddress.create({
      city: row.city,
      houseId: new UniqueEntityId(row.houseId),
      latitude: row.latitude,
      longitude: row.longitude,
      neighborhood: row.neighborhood,
      number: row.number,
      postalCode: row.postalCode,
      state: row.state,
      street: row.street,
    });
  }
}
