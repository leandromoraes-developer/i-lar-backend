import { UniqueEntityId } from 'src/core/enterprise/object-value/unique-entity-id';
import {
  IMediaProps,
  Media,
} from 'src/domain/medias/enterprise/entities/media';

interface IBannerCompanyProps extends IMediaProps {
  companyId?: UniqueEntityId | null;
}

export class BannerCompany extends Media<IBannerCompanyProps> {
  get companyId(): UniqueEntityId {
    return this.props.companyId;
  }

  static create(
    props: IBannerCompanyProps,
    companyId?: UniqueEntityId,
  ): BannerCompany {
    const bannerCompany = new BannerCompany(props, companyId);

    return bannerCompany;
  }
}
