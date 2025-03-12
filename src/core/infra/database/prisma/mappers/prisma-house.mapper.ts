import {
  House as PrismaHouse,
  HouseAddress as PrismaHouseAddress,
  HouseImage as PrismaHouseImage,
} from '@prisma/client';
import { UniqueEntityId } from 'src/core/enterprise/object-value/unique-entity-id';
import { BannerCompany } from 'src/domain/companies/enterprise/entities/banner-company';
import { Company } from 'src/domain/companies/enterprise/entities/company';
import {
  Category,
  House,
  TransactionType,
} from 'src/domain/houses/enterprise/entities/house';
import { HouseAddress } from 'src/domain/houses/enterprise/entities/house-address';
import { HouseImage } from 'src/domain/houses/enterprise/entities/house-image';

interface PrismaCompany {
  name: string;
  cellPhone: string;
  email: string;
  website: string;
  BannerCompanies: {
    link: string;
  };
}

export class PrismaHouseMapper {
  static toPrisma(data: House): PrismaHouse {
    return {
      area: data.area,
      bathrooms: data.bathrooms,
      bedrooms: data.bedrooms,
      category: data.category,
      description: data.description,
      companyId: data.company.id,
      name: data.name,
      transactionType: data.transactionType,
      price: data.price,
      id: data.id,
      houseAddressId: data.houseAddress.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  static toDomain(
    row: PrismaHouse & {
      HouseAddress?: PrismaHouseAddress;
      HouseImage: PrismaHouseImage[];
      Company: PrismaCompany;
    },
  ): House {
    const houseAddress = HouseAddress.create({
      street: row.HouseAddress.street,
      number: row.HouseAddress.number,
      neighborhood: row.HouseAddress.neighborhood,
      city: row.HouseAddress.city,
      state: row.HouseAddress.state,
      postalCode: row.HouseAddress.postalCode,
      latitude: row.HouseAddress.latitude,
      longitude: row.HouseAddress.longitude,
      houseId: new UniqueEntityId(row.id),
    });

    const houseImages = row.HouseImage.map((image) =>
      HouseImage.create({
        link: image.url,
        mimeType: image.mimeType,
        houseId: new UniqueEntityId(row.id),
        fileName: '',
      }),
    );

    const company = Company.create({
      bannerCompany: BannerCompany.create({
        fileName: '',
        link: row.Company.BannerCompanies.link,
        mimeType: '',
        companyId: null,
      }),
      cellphone: row.Company.cellPhone,
      cnpj: '',
      email: row.Company.email,
      name: row.Company.name,
      website: row.Company.website,
    });

    const house = House.create(
      {
        name: row.name,
        description: row.description,
        company: null,
        bathrooms: row.bathrooms,
        bedrooms: row.bedrooms,
        area: row.area,
        transactionType: row.transactionType as TransactionType,
        category: row.category as Category,
        price: row.price,
        houseAddress,
        houseImages,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
      },
      new UniqueEntityId(row.id),
    );

    house.addCompany(company);

    return house;
  }
}
