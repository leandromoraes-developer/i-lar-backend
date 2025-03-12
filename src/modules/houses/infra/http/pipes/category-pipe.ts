import { BadRequestException, PipeTransform } from '@nestjs/common';
import { Category } from 'src/domain/houses/enterprise/entities/house';

export class CategoryPipe implements PipeTransform<string, Category[]> {
  transform(value: string) {
    if (!value) return undefined;

    const categories = value.split(',') as Category[];

    const categorieValues = Object.values(Category);

    const invalidCategories = categories.filter(
      (category) => !categorieValues.includes(category),
    );

    if (invalidCategories.length > 0) {
      throw new BadRequestException(
        `Invalid values for transactionTypes: ${invalidCategories.join(', ')}`,
      );
    }

    return categories;
  }
}
