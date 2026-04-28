import { inject, Injectable, ResourceRef, signal } from '@angular/core';
import { CategoryServiceAbstract } from './category.service.abstract';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CategoryInterface } from '../../interfaces/category.interface';
import { catchError, tap, throwError, Observable } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends CategoryServiceAbstract {
  override readonly API_ENDPOINT = `${environment.apiUrl}/categories`;

  readonly #http = inject(HttpClient);

  readonly #categoriesSignal = signal<CategoryInterface[]>([]);
  readonly categories = this.#categoriesSignal.asReadonly();

  #load(): Observable<CategoryInterface[]> {
    return this.#http
      .get<CategoryInterface[]>(this.API_ENDPOINT)
      .pipe(
        tap((result) => this.#categoriesSignal.set(result)),
        catchError((error) => {
          console.error('Failed to load categories', error);
          return throwError(() => error);
        }),
      );
  }

  load(): ResourceRef<CategoryInterface[]> {
    return rxResource({
      stream: () => this.#load(),
      defaultValue: [],
    });
  }
}