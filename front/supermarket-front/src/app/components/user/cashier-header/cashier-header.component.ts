import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../../shared/services/TokenStorageService/token-storage.service';

@Component({
  selector: 'app-cashier-header',
  imports: [],
  templateUrl: './cashier-header.component.html',
  styleUrl: './cashier-header.component.css',
})
export class CashierHeaderComponent {

  #router = inject(Router);
  #tokenStorageService = inject(TokenStorageService);

  readonly user = this.#tokenStorageService.userData;


  logout(): void {
    this.#tokenStorageService.logout();
  }
}
