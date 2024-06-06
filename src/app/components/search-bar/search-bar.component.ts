import { Component, EventEmitter, Output, signal } from '@angular/core';

@Component({
  selector: 'search-bar',
  standalone: true,
  imports: [],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {

  @Output() valueChange = new EventEmitter<string>();


  search(v: string) {
    this.valueChange.emit(v.toLowerCase());
  }
}
