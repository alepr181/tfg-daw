import { computed, inject, Injectable, ResourceRef, Signal, signal } from '@angular/core';
import { UserServiceAbstract } from './user.service.abstract';
import { UserInterface } from '../../interfaces/user-interface';
import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY, Observable, tap, throwError } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { UserPayloadCreateInterface, UserPayloadUpdateInterface } from '../../interfaces/user-payload.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService extends UserServiceAbstract {
  #usersSignal = signal<UserInterface[]>([]);
  users = this.#usersSignal.asReadonly();

  #httpClient = inject(HttpClient);
  readonly #searchTerm = signal('');

  setSearchTerm(value: string) {
    this.#searchTerm.set(value);
  }

  readonly filteredUsers = computed(() => {
    const term = this.#searchTerm().trim().toLowerCase();

    if (!term) {
      return this.#usersSignal();
    }

    return this.#usersSignal().filter((user) =>
      user.name.toLowerCase().includes(term)
    );
  });

  #load(): Observable<UserInterface[]> {
    return this.#httpClient
      .get<UserInterface[]>(this.API_ENDPOINT)
      .pipe(
        tap((result) => this.#usersSignal.set(result)),
        catchError((error) => {
          console.error('Failed to load users', error);
          return throwError(() => error);
        }),
      );
  }

  load(): ResourceRef<UserInterface[]> {
    return rxResource({
      stream: () => this.#load(),
      defaultValue: [],
    });
  }

  #add(user: UserPayloadCreateInterface): Observable<UserInterface> {
    return this.#httpClient
      .post<UserInterface>(this.API_ENDPOINT, user)
      .pipe(
        tap((newUser) => {
          this.#usersSignal.update((currentUsers) => [
            ...currentUsers,
            newUser,
          ]);
        }),
        catchError((error) => {
          console.error('Failed to add user', error);
          return throwError(() => error);
        }),
      );
  }

  add(
    userNewSignal: Signal<UserPayloadCreateInterface | undefined>,
  ): ResourceRef<UserInterface | undefined> {
    return rxResource<UserInterface, UserPayloadCreateInterface | undefined>({
      params: () => userNewSignal(),
      stream: ({ params }) => {
        if (params === undefined) {
          return EMPTY;
        }

        return this.#add(params);
      },
    });
  }

  #update(user: UserPayloadUpdateInterface): Observable<UserInterface> {
    return this.#httpClient
      .put<UserInterface>(`${this.API_ENDPOINT}/${user.id}`, user)
      .pipe(
        tap((updated) =>
          this.#usersSignal.update((current) =>
            current.map((u) => (u.id === updated.id ? updated : u)),
          ),
        ),
        catchError((error) => {
          console.error('Failed to update user', error);
          return throwError(() => error);
        }),
      );
  }

  update(
    userSignal: Signal<UserPayloadUpdateInterface | undefined>,
  ): ResourceRef<UserInterface | undefined> {
    return rxResource({
      params: () => userSignal(),
      stream: ({ params }) => (params ? this.#update(params) : EMPTY),
      defaultValue: undefined,
    });
  }

  #remove(user: UserInterface): Observable<UserInterface> {
    return this.#httpClient
      .delete<UserInterface>(`${this.API_ENDPOINT}/${user.id}`)
      .pipe(
        tap(() =>
          this.#usersSignal.update((current) =>
            current.filter((u) => u.id !== user.id),
          ),
        ),
        catchError((error) => {
          console.error('Failed to delete user', error);
          return throwError(() => error);
        }),
      );
  }

  remove(
    userSignal: Signal<UserInterface | undefined>,
  ): ResourceRef<UserInterface | undefined> {
    return rxResource({
      params: () => userSignal(),
      stream: ({ params }) => (params ? this.#remove(params) : EMPTY),
      defaultValue: undefined,
    });
  }
}
