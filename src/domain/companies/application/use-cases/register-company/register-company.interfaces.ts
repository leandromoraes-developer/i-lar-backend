import { Company } from 'src/domain/companies/enterprise/entities/company';

export interface IRegisterCompanyRequest {
  name: string;
  cellphone: string;
  email: string;
  website?: string;
  cnpj: string;
  bannerCompanyId: string;
}

export interface IRegisterCompanyResponse {
  company: Company;
}
