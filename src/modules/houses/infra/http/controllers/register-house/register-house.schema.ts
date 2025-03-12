import {
  Category,
  TransactionType,
} from 'src/domain/houses/enterprise/entities/house';
import { z } from 'zod';

export const registerHouseSchema = z.object({
  address: z.object({
    city: z.string().nonempty('City is required'),
    neighborhood: z.string().nonempty('Neighborhood is required'),
    number: z.string().nonempty('Number is required'),
    postalCode: z.string().nonempty(),
    state: z.string().nonempty('State is required'),
    street: z.string().nonempty('Street is required'),
  }),
  area: z.number().positive('Area must be a positive number'),
  bathrooms: z.number().int().min(1, 'Bathrooms must be at least 1'),
  bedrooms: z.number().int().min(1, 'Bedrooms must be at least 1'),
  category: z.nativeEnum(Category, {
    errorMap: () => ({ message: 'Invalid category' }),
  }),
  companyId: z.string().uuid('Invalid companyId format'),
  description: z.string().nonempty('Description is required'),
  houseImageIds: z
    .array(z.string().uuid('Invalid UUID format for houseImageIds'))
    .nonempty('At least one house image is required'),
  name: z.string().nonempty('Name is required'),
  price: z.number().positive('Price must be a positive number'),
  transactionType: z.nativeEnum(TransactionType, {
    errorMap: () => ({ message: 'Invalid transaction type' }),
  }),
});

export type IRegisterHouseBodySchema = z.infer<typeof registerHouseSchema>;
