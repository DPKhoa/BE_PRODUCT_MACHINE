/* eslint-disable prettier/prettier */
// product-response.dto.ts
export class ProductResponseDto {
  productId: number;
  name: string;
  descrption: string;
  price: number;
  quantity: number;
  status: boolean;
  cost: number;
  createdAt: Date;
  updatedAt: Date;
  category: {
    id: number;
    name: string;
    status: boolean;
  } | null;
  brand: {
    id: number;
    name: string;
    image: string;
  } | null;
  events:
    | {
        eventid: number;
        productid: number;
        discount: number;
        image: string;
      }[]
    | null;
}
