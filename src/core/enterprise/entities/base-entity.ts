import { UniqueEntityId } from '../object-value/unique-entity-id';

export class BaseEntity<Props> {
  protected _id: UniqueEntityId;
  protected props: Props;

  get id() {
    return this._id.toValue();
  }

  constructor(props: Props, id: UniqueEntityId) {
    this.props = props;
    this._id = id ?? UniqueEntityId.generateUniqueEntityId();
  }
}
