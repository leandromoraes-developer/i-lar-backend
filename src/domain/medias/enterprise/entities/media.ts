import { BaseEntity } from 'src/core/enterprise/entities/base-entity';

export interface IMediaProps {
  fileName: string;
  mimeType: string;
  link: string;
}

export class Media<Props> extends BaseEntity<IMediaProps & Props> {
  get fileName(): string {
    return this.props.fileName;
  }

  set fileName(fileName: string) {
    this.props.fileName = fileName;
  }

  get mimeType(): string {
    return this.props.mimeType;
  }

  set mimeType(mimeType: string) {
    this.props.mimeType = mimeType;
  }

  get link(): string {
    return this.props.link;
  }

  set link(link: string) {
    this.props.link = link;
  }
}
