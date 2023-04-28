import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute){}

  enteredSearchValue!: Event

  @Output() searchTextChanged: EventEmitter<Event> = new EventEmitter<Event>()

  ngOnInit(): void {
 
  }

onSearchTextChanged(){
  this.searchTextChanged.emit(this.enteredSearchValue)
}
}
