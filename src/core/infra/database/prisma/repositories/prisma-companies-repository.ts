import { Injectable } from '@nestjs/common';

import { ICompaniesRepository } from 'src/domain/companies/enterprise/repositories/companies-repository';
import { PrismaService } from '../prisma.service';
import { Company } from 'src/domain/companies/enterprise/entities/company';
import { PrismaCompaniesMapper } from '../mappers/prisma-companies.mapper';

@Injectable()
export class PrismaCompaniesRepository implements ICompaniesRepository {
  constructor(private prismaService: PrismaService) {}

  public async create(dataCompany: Company): Promise<void> {
    const data = PrismaCompaniesMapper.toPrisma(dataCompany);

    const company = await this.prismaService.company.create({
      data,
    });

    await this.prismaService.bannerCompanies.update({
      where: {
        id: dataCompany.bannerCompany.id,
      },
      data: {
        companyId: company.id,
      },
    });
  }

  public async findById(companyId: string): Promise<Company | null> {
    const company = await this.prismaService.company.findUnique({
      where: {
        id: companyId,
      },
    });

    if (!company) return null;

    return PrismaCompaniesMapper.toDomain(company);
  }

  public async findByName(companyName: string): Promise<Company | null> {
    const company = await this.prismaService.company.findFirst({
      where: {
        name: companyName,
      },
    });

    if (!company) return null;

    return PrismaCompaniesMapper.toDomain(company);
  }

  public async findByCNPJ(cnpj: string): Promise<Company | null> {
    const company = await this.prismaService.company.findFirst({
      where: {
        cnpj,
      },
    });

    if (!company) return null;

    return PrismaCompaniesMapper.toDomain(company);
  }
}
