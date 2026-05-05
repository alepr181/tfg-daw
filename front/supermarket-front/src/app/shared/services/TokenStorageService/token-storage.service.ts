import { computed, inject, Injectable, signal } from '@angular/core';
import { UserInterface } from '../../interfaces/user-interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService{
  #isLogin = signal(false);
  readonly isLogin = computed(() => this.#isLogin());
  #token = localStorage.getItem("token") || "";
  #user = signal<UserInterface | null>(JSON.parse(localStorage.getItem('user') || 'null'));
  #router = inject(Router);
  readonly user = computed(() => this.#user());



  constructor() {
    if(this.token){
      this.#isLogin.set(true);
    }
  }

    set token(token: string) {
      this.#token = token;
      localStorage.setItem("token", token);
      const logged = (token !== "");
      this.#isLogin.set(logged);
    }

    get token():string {
      return this.#token;
    }

    set userData(user: UserInterface | null) {
      this.#user.set(user);

    if (user === null) {
      localStorage.removeItem('user');
      return;
    }

    localStorage.setItem('user', JSON.stringify(user));
  }

  get userData(): UserInterface | null {
    return this.#user();
  }

  logout(): void {
    this.token = '';
    this.userData = null;
    this.#router.navigate(['/']);
  }
  }
