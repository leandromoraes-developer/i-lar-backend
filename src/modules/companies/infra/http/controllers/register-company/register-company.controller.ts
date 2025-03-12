import { Body, Controller, Post } from '@nestjs/common';

import { RegisterCompanyUseCase } from 'src/domain/companies/application/use-cases/register-company/register-company';
import { IRegisterCompanyBody } from './register-company.schema';
import { CompanyPresenter } from '../../presenters/company.presenter';

@Controller('/companies')
export class RegisterCompanyController {
  constructor(private registerCompany: RegisterCompanyUseCase) {}

  @Post()
  public async handle(
    @Body()
    {
      cellphone,
      name,
      bannerCompanyId,
      email,
      website,
      cnpj,
    }: IRegisterCompanyBody,
  ) {
    const { company } = await this.registerCompany.execute({
      cellphone,
      name,
      email,
      website,
      bannerCompanyId,
      cnpj,
    });

    return {
      company: CompanyPresenter.toHTTP(company),
    };
  }
}
