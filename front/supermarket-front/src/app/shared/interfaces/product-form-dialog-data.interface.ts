import { CategoryInterface } from "./category.interface";
import { ProductInterface } from "./product-interface";
import { SupplierInterface } from "./supplier.interface";

    export interface ProductFormDialogData {
    product: ProductInterface | null;
    categories: CategoryInterface[];
    suppliers: SupplierInterface[];
    }