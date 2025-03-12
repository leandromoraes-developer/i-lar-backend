import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { TransactionType } from 'src/domain/houses/enterprise/entities/house';

@Injectable()
export class ParseTransactionTypePipe
  implements PipeTransform<string, TransactionType[]>
{
  transform(value: string | undefined): TransactionType[] | undefined {
    if (!value) return undefined;

    const transactionTypes = value.split(',');

    const validTransactionTypes = Object.values(TransactionType) as string[];

    const invalidValues = transactionTypes.filter(
      (type) => !validTransactionTypes.includes(type),
    );

    if (invalidValues.length > 0) {
      throw new BadRequestException(
        `Invalid values for transactionTypes: ${invalidValues.join(', ')}`,
      );
    }

    return transactionTypes as TransactionType[];
  }
}
