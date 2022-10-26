import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entity";
import { Properties } from "../../entities/properties.entity";
import { Adresses } from "../../entities/addresses.entity";
import { AppError } from "../../errors/appError";
import { IPropertyRequest, IProperty } from "../../interfaces/properties";

const createPropertyService = async ({
  value,
  size,
  address: addressRequest,
  categoryId,
}: IPropertyRequest): Promise<Properties> => {
  const propertyRepository = AppDataSource.getRepository(Properties);
  const categoryRepository = AppDataSource.getRepository(Categories);
  const addressRepository = AppDataSource.getRepository(Adresses);

  if (addressRequest.zipCode.length != 8) {
    throw new AppError("Invalid zipcode", 400);
  }

  if (addressRequest.state.length != 2) {
    throw new AppError("Invalide state", 400);
  }

  const address = await addressRepository.create(addressRequest);

  const addressAlreadyExists = await addressRepository.findOneBy({
    district: addressRequest.district,
    zipCode: addressRequest.zipCode,
    number: addressRequest.number,
    city: addressRequest.city,
    state: addressRequest.state,
  });

  if (addressAlreadyExists) {
    throw new AppError("Address already exists", 400);
  }

  await addressRepository.save(address);

  const category = await categoryRepository.findOneBy({ id: categoryId });

  if (!category) {
    throw new AppError("Category does not exist", 404);
  }

  const property = propertyRepository.create({
    value,
    size,
    address,
    category: category,
  });

  await propertyRepository.save(property);

  return property;
};

export default createPropertyService;
