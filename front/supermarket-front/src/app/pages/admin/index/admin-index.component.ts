import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLink, RouterLinkActive } from '@angular/router';
import { TokenStorageService } from '../../../shared/services/TokenStorageService/token-storage.service';

@Component({
  selector: 'app-admin-index.component',
  imports: [RouterOutlet, RouterLinkWithHref, RouterLink, RouterLinkActive],
  templateUrl: './admin-index.component.html',
  styleUrl: './admin-index.component.css',
})
export class AdminIndexComponent {

  readonly #tokenStorageService = inject(TokenStorageService);

  readonly user = this.#tokenStorageService.userData;

  logout() {
    this.#tokenStorageService.logout();
  }

}
