import { UniqueEntityId } from 'src/core/enterprise/object-value/unique-entity-id';
import {
  Media,
  IMediaProps,
} from 'src/domain/medias/enterprise/entities/media';

interface IHouseImageProps extends IMediaProps {
  houseId: UniqueEntityId;
}

export class HouseImage extends Media<IHouseImageProps> {
  get houseId(): UniqueEntityId {
    return this.props.houseId;
  }

  public associateWithHouse(houseId: UniqueEntityId): void {
    if (this.props.houseId) {
      throw new Error('Image is already associated with a house');
    }
    this.props.houseId = houseId;
  }

  static create(data: IHouseImageProps, houseId?: UniqueEntityId) {
    const houseImage = new HouseImage(data, houseId);

    return houseImage;
  }
}
