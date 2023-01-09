export interface IAddressRequest {
  district: string;
  zipCode: string;
  number?: string;
  city: string;
  state: string;
}

interface IAddressResponse extends IAddressRequest {
  id: string;
}

export interface IPropertyRequest {
  value: number;
  size: number;
  address: IAddressRequest;
  categoryId: string;
}

export interface IPropertyResponse {
  value: number;
  size: number;
  address: IAddressResponse;
  categoryId?: string;
  id: string;
  sold: boolean;
  createdAt: Date;
  updatedAt: Date;
}
