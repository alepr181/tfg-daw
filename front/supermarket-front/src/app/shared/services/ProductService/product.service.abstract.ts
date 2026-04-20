import { ResourceRef, Signal } from '@angular/core';
import { ProductInterface } from '../../interfaces/product-interface';

export abstract class ProductServiceAbstract {
  readonly API_ENDPOINT = "http://127.0.0.1:8000/api/products/"

  abstract load(cache?: boolean): ResourceRef<{ data: ProductInterface[]; total: number }>;
 //abstract add(ProductInterfaceNewSignal: Signal<ProductInterface>): ResourceRef<ProductInterface>;
  //abstract update(ProductInterfaceToUpdate: Signal<ProductInterface>): ResourceRef<ProductInterface>;;
  //abstract remove(ProductInterfaceToRemove: Signal<ProductInterface>): ResourceRef<ProductInterface>;
  //abstract findOne(id: Signal<string>): ResourceRef<ProductInterface>;
}
