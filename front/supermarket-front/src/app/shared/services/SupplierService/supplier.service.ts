import { inject, Injectable, ResourceRef, signal, Signal } from '@angular/core';
import { SupplierServiceAbstract } from './supplier.service.abstract';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, NEVER, Observable, tap, throwError } from 'rxjs';
import { SupplierInterface } from '../../interfaces/supplier.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { SupplierPayloadCreateInterface, SupplierPayloadUpdateInterface } from '../../interfaces/supplier-payload.interface';

@Injectable({
  providedIn: 'root',
})
export class SupplierService extends SupplierServiceAbstract {
  override readonly API_ENDPOINT = `${environment.apiUrl}/suppliers`;

  readonly #http = inject(HttpClient);

  readonly #suppliersSignal = signal<SupplierInterface[]>([]);
  readonly suppliers = this.#suppliersSignal.asReadonly();

  #load(): Observable<{ data: SupplierInterface[]; total: number }> {
    return this.#http
      .get<{ data: SupplierInterface[]; total: number }>(this.API_ENDPOINT)
      .pipe(
        tap((result) => this.#suppliersSignal.set(result.data)),
        catchError((error) => {
          console.error('Failed to load suppliers', error);
          return throwError(() => error);
        }),
      );
  }

  load(): ResourceRef<{ data: SupplierInterface[]; total: number }> {
    return rxResource({
      stream: () => this.#load(),
      defaultValue: { data: [], total: 0 },
    });
  }

  #add(supplier: SupplierPayloadCreateInterface): Observable<SupplierInterface> {
    return this.#http.post<SupplierInterface>(this.API_ENDPOINT, supplier).pipe(
      tap((newSupplier) => {
        this.#suppliersSignal.update((currentSuppliers: SupplierInterface[]) => [
          ...currentSuppliers,
          newSupplier,
        ]);
      }),
      catchError((error) => {
        console.error('Failed to add supplier', error);
        return throwError(() => error);
      }),
    );
  }

  add(
    supplierSignal: Signal<SupplierPayloadCreateInterface | null>,
  ): ResourceRef<SupplierInterface | undefined> {
    return rxResource<SupplierInterface, SupplierPayloadCreateInterface | null>({
      params: () => supplierSignal(),
      stream: ({ params }) => (params === null ? NEVER : this.#add(params)),
    });
  }

  #update(supplier: SupplierPayloadUpdateInterface): Observable<SupplierInterface> {
    return this.#http
      .put<SupplierInterface>(`${this.API_ENDPOINT}/${supplier.id}`, supplier)
      .pipe(
        tap((updatedSupplier) => {
          this.#suppliersSignal.update((currentSuppliers: SupplierInterface[]) =>
            currentSuppliers.map((currentSupplier) =>
              currentSupplier.id === updatedSupplier.id
                ? updatedSupplier
                : currentSupplier,
            ),
          );
        }),
        catchError((error) => {
          console.error('Failed to update supplier', error);
          return throwError(() => error);
        }),
      );
  }

  update(
    supplierSignal: Signal<SupplierPayloadUpdateInterface | null>,
  ): ResourceRef<SupplierInterface | undefined> {
    return rxResource<SupplierInterface, SupplierPayloadUpdateInterface | null>({
      params: () => supplierSignal(),
      stream: ({ params }) => (params === null ? NEVER : this.#update(params)),
    });
  }

  #remove(supplier: SupplierInterface): Observable<SupplierInterface> {
    return this.#http
      .delete<SupplierInterface>(`${this.API_ENDPOINT}/${supplier.id}`)
      .pipe(
        tap(() => {
          this.#suppliersSignal.update((currentSuppliers: SupplierInterface[]) =>
            currentSuppliers.filter(
              (currentSupplier) => currentSupplier.id !== supplier.id,
            ),
          );
        }),
        catchError((error) => {
          console.error('Failed to delete supplier', error);
          return throwError(() => error);
        }),
      );
  }

  remove(
    supplierSignal: Signal<SupplierInterface | null>,
  ): ResourceRef<SupplierInterface | undefined> {
    return rxResource<SupplierInterface, SupplierInterface | null>({
      params: () => supplierSignal(),
      stream: ({ params }) => (params === null ? NEVER : this.#remove(params)),
    });
  }
}
