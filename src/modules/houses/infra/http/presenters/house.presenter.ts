import { IHouseListDTO } from 'src/domain/houses/enterprise/dtos/house-list.dto';
import { House } from 'src/domain/houses/enterprise/entities/house';

export class HousePresenter {
  static houseListtoHTTP({
    area,
    bathrooms,
    bedrooms,
    houseAddress,
    name,
    price,
    category,
    transactionType,
    houseImage,
    id,
  }: IHouseListDTO) {
    return {
      id,
      area,
      bathrooms,
      bedrooms,
      address: houseAddress,
      name,
      price,
      category,
      transactionType,
      urlBanner: houseImage.url,
    };
  }

  static houseDetailToHTTP(house: House) {
    const { city, latitude, longitude, neighborhood, number, state, street } =
      house.houseAddress;

    return {
      id: house.id,
      area: house.area,
      bathrooms: house.bathrooms,
      bedrooms: house.bedrooms,
      category: house.category,
      description: house.description,
      transactionType: house.transactionType,
      name: house.name,
      price: house.price,
      images: house.houseImages.map((image) => ({
        url: image.link,
      })),
      address: {
        city,
        latitude,
        longitude,
        neighborhood,
        number,
        state,
        street,
      },
      company: {
        bannerCompany: house.company.bannerCompany.link,
        cellphone: house.company.cellphone,
        email: house.company.email,
        name: house.company.name,
        website: house.company.website,
      },
    };
  }
}
