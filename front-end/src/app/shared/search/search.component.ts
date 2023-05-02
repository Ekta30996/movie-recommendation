import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../movie.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnChanges {
  constructor() {}

  @Input() state: Movie[] = [];
  enteredSearchValue!: Event;
  @Output() searchTextChanged: EventEmitter<Event> = new EventEmitter<Event>();

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('state' + this.state);
  }
  onSearchTextChanged() {
    this.searchTextChanged.emit(this.enteredSearchValue);
  }
}
