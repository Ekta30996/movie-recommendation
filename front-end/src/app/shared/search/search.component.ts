import {
  Component,
  EventEmitter,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  constructor() {}

  searchValues!: Event;
  @Output()
  searchTextChanged: EventEmitter<Event> = new EventEmitter<Event>();

  ngOnInit(): void {}

  onSearch() {
    this.searchTextChanged.emit(this.searchValues);
  }
}
