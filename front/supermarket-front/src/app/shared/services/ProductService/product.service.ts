import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, ResourceRef, signal } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ProductInterface } from '../../interfaces/product-interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductServiceAbstract } from './product.service.abstract';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends ProductServiceAbstract {
  #productsSignal = signal<ProductInterface[]>([]);
  products = this.#productsSignal.asReadonly();
  #httpClient = inject(HttpClient);
  readonly #searchTerm = signal("")

  setSearchTerm(value: string) {
    this.#searchTerm.set(value)
  }

  readonly filteredProducts = computed(() => {
  const term = this.#searchTerm().trim().toLowerCase();

  if (!term) {
    return this.#productsSignal();
  }

  return this.#productsSignal().filter((product) =>
    product.name.toLowerCase().includes(term)
  );
});

  #load(): Observable<{ data: ProductInterface[]; total: number }> {
      return this.#httpClient
      .get<{ data: ProductInterface[]; total: number }>(this.API_ENDPOINT)
      .pipe(
        tap(result => this.#productsSignal.set(result.data)),
        catchError((error) => {
          console.error('Failed to load weapons, error');
          return throwError(() => error);
        })
      );
  }
  load(): ResourceRef<{ data: ProductInterface[], total: number}> {
    return rxResource({
      stream: () => this.#load(),
      defaultValue: {data: [], total: 0}
    })
  };


}
