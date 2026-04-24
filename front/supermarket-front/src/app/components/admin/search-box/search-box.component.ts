import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-search-box',
  imports: [],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css',
})
export class SearchBoxComponent {
  readonly placeholder = input('Buscar...');
  readonly searchChange = output<string>();
}

