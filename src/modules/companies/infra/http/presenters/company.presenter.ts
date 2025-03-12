import { Company } from 'src/domain/companies/enterprise/entities/company';

export class CompanyPresenter {
  static toHTTP(data: Company) {
    return {
      id: data.id,
      name: data.name,
      website: data.website,
      cellphone: data.cellphone,
      email: data.email,
      banner: data.bannerCompany,
      cnpj: data.cnpj,
    };
  }
}
