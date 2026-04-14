import { ProductInterface } from './product-interface';

export interface CartProductInterface {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  stock: number;
  subtotal: number;
  product: ProductInterface;
}