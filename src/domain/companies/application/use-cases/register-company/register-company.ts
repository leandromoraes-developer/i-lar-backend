import { Injectable } from '@nestjs/common';

import { ICompaniesRepository } from 'src/domain/companies/enterprise/repositories/companies-repository';
import { Company } from 'src/domain/companies/enterprise/entities/company';

import {
  IRegisterCompanyRequest,
  IRegisterCompanyResponse,
} from './register-company.interfaces';
import { IBannerCompaniesRepository } from 'src/domain/companies/enterprise/repositories/banner-companies.repository';

@Injectable()
export class RegisterCompanyUseCase {
  constructor(
    private companiesRepository: ICompaniesRepository,
    private bannerCompaniesRepository: IBannerCompaniesRepository,
  ) {}

  public async execute({
    cellphone,
    name,
    email,
    website,
    bannerCompanyId,
    cnpj,
  }: IRegisterCompanyRequest): Promise<IRegisterCompanyResponse> {
    const checkCnpjAlreadyUsed =
      await this.companiesRepository.findByCNPJ(cnpj);

    if (checkCnpjAlreadyUsed) {
      throw new Error('CNPJ already used');
    }

    const checkBannerAlredyUploaded =
      await this.bannerCompaniesRepository.findById(bannerCompanyId);

    if (!checkBannerAlredyUploaded) {
      throw new Error('Banner not found');
    }

    if (checkBannerAlredyUploaded.companyId) {
      throw new Error('Banner already associated with another company');
    }

    const company = Company.create({
      cellphone,
      name,
      email,
      website,
      bannerCompany: checkBannerAlredyUploaded,
      cnpj,
    });

    await this.companiesRepository.create(company);

    return {
      company,
    };
  }
}
