export interface IAddressRequest {
  district: string;
  zipCode: string;
  number?: string;
  city: string;
  state: string;
}

export interface IPropertyRequest {
  value: number;
  size: number;
  address: IAddressRequest;
  categoryId: string;
}

export interface IProperty {
  id: string;
  value: number;
  size: number;
  createdAt: Date;
  updatedAt: Date;
  address: IAddressRequest;
  categoryId: string;
}
