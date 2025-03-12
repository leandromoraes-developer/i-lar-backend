import { v7 } from 'uuid';

export class UniqueEntityId {
  private value: string;

  public toValue() {
    return this.value;
  }

  public toString() {
    return this.value.toString();
  }

  constructor(value?: string) {
    this.value = value ?? v7();
  }

  static generateUniqueEntityId() {
    const uniqueEntityId = new UniqueEntityId();

    return uniqueEntityId;
  }
}
