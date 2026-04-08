import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CashierPage } from './pages/user/cashier-page/cashier-page';

@Component({
  selector: 'app-root',
  imports: [CashierPage],
  template: '<app-cashier-page/>',
})
export class App {
  protected readonly title = signal('supermarket-front');
}
