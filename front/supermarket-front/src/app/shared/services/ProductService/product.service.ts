  import { HttpClient } from '@angular/common/http';
  import { computed, inject, Injectable, ResourceRef, Signal, signal } from '@angular/core';
  import { catchError, EMPTY, NEVER, Observable, tap, throwError } from 'rxjs';
  import { ProductInterface } from '../../interfaces/product-interface';
  import { rxResource } from '@angular/core/rxjs-interop';
  import { ProductServiceAbstract } from './product.service.abstract';
  import { ProductPayloadCreateInterface, ProductPayloadUpdateInterface } from '../../interfaces/product-payload.interface';

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
          console.error('Failed to load products, error');
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

  #add(product: ProductPayloadCreateInterface): Observable<ProductInterface> {
  return this.#httpClient
    .post<ProductInterface>(this.API_ENDPOINT, product)
    .pipe(
      tap((newProduct) => {
        this.#productsSignal.update((currentProducts) => [
          ...currentProducts,
          newProduct,
        ]);
      }),
      catchError((error) => {
        console.error('Failed to add product', error);
        return throwError(() => error);
      }),
    );
  }
  add(
  productNewSignal: Signal<ProductPayloadCreateInterface | undefined>,
  ): ResourceRef<ProductInterface | undefined> {
  return rxResource<ProductInterface, ProductPayloadCreateInterface | undefined>({
    params: () => productNewSignal(),
    stream: ({ params }) => {
      if (params === undefined) {
        return EMPTY;
      }

      return this.#add(params);
    },
  });
  }

  #update(product: ProductPayloadUpdateInterface): Observable<ProductInterface> {
  return this.#httpClient
    .put<ProductInterface>(`${this.API_ENDPOINT}/${product.id}`, product)
    .pipe(
      tap((updated) =>
        this.#productsSignal.update((current) =>
          current.map((p) => (p.id === updated.id ? updated : p))
        )
      ),
      catchError((error) => {
        console.error('Failed to update product', error);
        return throwError(() => error);
      })
    );
  }

  update(productSignal: Signal<ProductPayloadUpdateInterface | undefined>): ResourceRef<ProductInterface | undefined> {
  return rxResource({
    params: () => productSignal(),
    stream: ({ params }) => (params ? this.#update(params) : EMPTY),
    defaultValue: undefined,
  });
  }

  #remove(product: ProductInterface): Observable<ProductInterface> {
  return this.#httpClient
    .delete<ProductInterface>(`${this.API_ENDPOINT}/${product.id}`)
    .pipe(
      tap(() =>
        this.#productsSignal.update((current) =>
          current.filter((p) => p.id !== product.id)
        )
      ),
        catchError((error) => {
        console.error('Failed to delete product', error);
        return throwError(() => error);
      })
    );
  }

  remove(productSignal: Signal<ProductInterface | undefined>): ResourceRef<ProductInterface | undefined> {
    return rxResource({
      params: () => productSignal(),
      stream: ({ params }) => (params ? this.#remove(params) : EMPTY),
      defaultValue: undefined,
    });
  }
  }
