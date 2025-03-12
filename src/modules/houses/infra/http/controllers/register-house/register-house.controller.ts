import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'src/core/infra/http/pipes/zod-validation.pipe';
import { RegisterHouseUseCase } from 'src/domain/houses/application/use-cases/register-house/register-house';
import {
  IRegisterHouseBodySchema,
  registerHouseSchema,
} from './register-house.schema';

@Controller('/houses')
export class RegisterHouseController {
  constructor(private registerHouse: RegisterHouseUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(registerHouseSchema))
  public async execute(@Body() body: IRegisterHouseBodySchema) {
    const { house } = await this.registerHouse.execute({
      name: body.name,
      area: body.area.toString(),
      bathrooms: body.bathrooms.toString(),
      bedrooms: body.bedrooms.toString(),
      category: body.category,
      description: body.description,
      companyId: body.companyId,
      price: body.price.toString(),
      transactionType: body.transactionType,
      houseImageIds: body.houseImageIds,
      address: {
        city: body.address.city,
        neighborhood: body.address.neighborhood,
        number: body.address.number,
        postalCode: body.address.postalCode,
        state: body.address.state,
        street: body.address.street,
      },
    });

    return {
      house,
    };
  }
}
