import { BaseEntity } from 'src/core/enterprise/entities/base-entity';
import { UniqueEntityId } from 'src/core/enterprise/object-value/unique-entity-id';
import { BannerCompany } from './banner-company';

interface ICompanyProps {
  name: string;
  cellphone: string;
  email: string;
  cnpj: string;
  website?: string;
  bannerCompany: BannerCompany;
}

export class Company extends BaseEntity<ICompanyProps> {
  get name() {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get cellphone() {
    return this.props.cellphone;
  }

  set cellphone(cellphone: string) {
    this.props.cellphone = cellphone;
  }

  get email() {
    return this.props.email;
  }

  set email(email: string) {
    this.props.email = email;
  }

  get cnpj() {
    return this.props.cnpj;
  }

  set cnpj(cnpj: string) {
    this.props.cnpj = cnpj;
  }

  get website() {
    return this.props.website;
  }

  set website(website: string) {
    this.props.website = website;
  }

  get bannerCompany() {
    return this.props.bannerCompany;
  }

  set bannerCompany(bannerCompany: BannerCompany) {
    this.props.bannerCompany = bannerCompany;
  }

  static create(props: ICompanyProps, id?: UniqueEntityId) {
    const company = new Company(
      {
        ...props,
      },
      id,
    );

    return company;
  }
}
