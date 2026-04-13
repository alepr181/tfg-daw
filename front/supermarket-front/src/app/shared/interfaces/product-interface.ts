export interface ProductInterface {
  id: number;
  name: string;
  barcode: string;
  price: string;
  stock: number;
  category_id: number;
  supplier_id: number;
  created_at: string;
  updated_at: string;
  category?: {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
  };
  supplier?: {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
  };
}