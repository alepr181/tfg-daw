import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'app-product-search',
  imports: [],
  templateUrl: './product-search.html',
  styleUrl: './product-search.css',
})
export class ProductSearch {

  searchChange = output<string>();
  
}