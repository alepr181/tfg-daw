export interface ProductPayloadCreateInterface {
    name: string;
    barcode: string;
    price: number;
    stock: number;
    category_id: number;
    supplier_id: number;
}

export interface ProductPayloadUpdateInterface {
    id: number;
    name: string;
    barcode: string;
    price: number;
    stock: number;
    category_id: number;
    supplier_id: number;
}