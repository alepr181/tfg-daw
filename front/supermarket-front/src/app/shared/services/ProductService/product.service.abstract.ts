import { ResourceRef, Signal } from '@angular/core';
import { ProductInterface } from '../../interfaces/product-interface';
import { ProductPayloadCreateInterface, ProductPayloadUpdateInterface } from '../../interfaces/product-payload.interface';
import { environment } from '../../../environments/environment';

export abstract class ProductServiceAbstract {
  readonly API_ENDPOINT = `${environment.apiUrl}/products`;

  abstract load(): ResourceRef<{
    data: ProductInterface[];
    total: number;
  }>;

  abstract add(
    productSignal: Signal<ProductPayloadCreateInterface | undefined>
  ): ResourceRef<ProductInterface | undefined>;

  abstract update(
    productSignal: Signal<ProductPayloadUpdateInterface | undefined>
  ): ResourceRef<ProductInterface | undefined>;

  abstract remove(
    productSignal: Signal<ProductInterface | undefined>
  ): ResourceRef<ProductInterface | undefined>;
}