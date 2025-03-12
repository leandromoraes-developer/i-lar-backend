import {
  Category,
  House,
  TransactionType,
} from 'src/domain/houses/enterprise/entities/house';
import {
  IFetchManyParams,
  IHousesRepository,
} from 'src/domain/houses/enterprise/repositories/houses-repository';
import { PrismaService } from '../prisma.service';
import { PrismaHouseMapper } from '../mappers/prisma-house.mapper';
import { PrismaHouseAddressMapper } from '../mappers/prisma-house-address.mapper';
import { Injectable } from '@nestjs/common';
import { IHouseListDTO } from 'src/domain/houses/enterprise/dtos/house-list.dto';

@Injectable()
export class PrismaHouseRepository implements IHousesRepository {
  constructor(private prismaService: PrismaService) {}

  public async create(data: House): Promise<void> {
    const houseData = PrismaHouseMapper.toPrisma(data);

    await this.prismaService.house.create({
      data: houseData,
    });

    const houseAddressData = PrismaHouseAddressMapper.toPrisma(
      data.houseAddress,
    );

    await this.prismaService.houseAddress.create({
      data: houseAddressData,
    });

    const houseImageIds = data.houseImages.map((houseImage) => houseImage.id);

    await this.prismaService.houseImage.updateMany({
      where: {
        id: {
          in: houseImageIds,
        },
      },
      data: {
        houseId: data.id,
      },
    });
  }

  public async fetchMany({
    page,
    transactionTypes,
    categories,
  }: IFetchManyParams): Promise<IHouseListDTO[]> {
    const LIMIT = 12;

    const houses = await this.prismaService.house.findMany({
      take: LIMIT,
      skip: (page - 1) * LIMIT,
      where: {
        ...(transactionTypes && {
          transactionType: { in: transactionTypes },
        }),
        ...(categories && {
          category: { in: categories },
        }),
      },
      select: {
        id: true,
        bathrooms: true,
        bedrooms: true,
        area: true,
        price: true,
        category: true,
        transactionType: true,
        name: true,
        HouseImage: {
          take: 1,
          select: {
            url: true,
            mimeType: true,
          },
        },
        HouseAddress: {
          select: {
            city: true,
            neighborhood: true,
            number: true,
            street: true,
          },
        },
      },
    });

    const housesFormated = houses.map((house) => ({
      id: house.id,
      name: house.name,
      area: house.area,
      bathrooms: house.bathrooms,
      bedrooms: house.bedrooms,
      price: house.price,
      category: house.category as Category,
      transactionType: house.transactionType as TransactionType,
      houseAddress: {
        number: house.HouseAddress.number,
        street: house.HouseAddress.street,
        neighborhood: house.HouseAddress.neighborhood,
        city: house.HouseAddress.city,
      },
      houseImage: {
        url: house.HouseImage[0]?.url,
        mimeType: house.HouseImage[0]?.mimeType,
      },
    }));

    return housesFormated;
  }

  public async findById(houseId: string): Promise<House> {
    const house = await this.prismaService.house.findUnique({
      where: {
        id: houseId,
      },
      include: {
        HouseAddress: true,
        HouseImage: {
          select: {
            url: true,
            mimeType: true,
          },
        },
        Company: {
          select: {
            cellPhone: true,
            email: true,
            name: true,
            website: true,
            BannerCompanies: {
              select: {
                link: true,
              },
            },
          },
        },
      },
    });

    return PrismaHouseMapper.toDomain(house as any);
  }
}
