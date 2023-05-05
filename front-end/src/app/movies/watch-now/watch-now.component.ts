import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/shared/movie.interface';

@Component({
  selector: 'app-watch-now',
  templateUrl: './watch-now.component.html',
  styleUrls: ['./watch-now.component.css'],
})
export class WatchNowComponent implements OnInit {
  loader: boolean = false;
  isReadMore: boolean = true;

  @Input() watchMovie!: Movie;

  ngOnInit(): void {}

  showText() {
    this.isReadMore = !this.isReadMore;
  }
}
