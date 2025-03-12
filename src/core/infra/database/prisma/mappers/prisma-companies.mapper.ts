import { Company as PrismaCompany } from '@prisma/client';
import { UniqueEntityId } from 'src/core/enterprise/object-value/unique-entity-id';
import { Company } from 'src/domain/companies/enterprise/entities/company';

export class PrismaCompaniesMapper {
  static toDomain(row: PrismaCompany): Company {
    return Company.create(
      {
        cellphone: row.cellPhone,
        name: row.name,
        email: row.email,
        cnpj: row.cnpj,
        website: row.website,
        bannerCompany: undefined,
      },
      new UniqueEntityId(row.id),
    );
  }

  static toPrisma(data: Company): PrismaCompany {
    return {
      cellPhone: data.cellphone,
      id: data.id,
      name: data.name,
      email: data.email,
      website: data.website,
      cnpj: data.cnpj,
      createdAt: new Date(),
    };
  }
}
