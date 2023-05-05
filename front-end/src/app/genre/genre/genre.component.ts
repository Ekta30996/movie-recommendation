import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Genre } from 'src/app/shared/genre.interface';
import { GenresService } from 'src/app/shared/service/genres.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css'],
})
export class GenreComponent implements OnInit, OnDestroy {
  genres: Genre[] = [];

  listGenreSubscription!: Subscription;
  getGenreSubscription!: Subscription;
  addGenreSubscription!: Subscription;

  genreCount: number = 0;

  loader: boolean = false;
  isClicked: boolean = false;

  clickedId!: string;

  constructor(private _genreService: GenresService, private router: Router) {}

  ngOnInit(): void {
    this.listGenreSubscription = this._genreService
      .loadGenre()
      .subscribe((genre) => {
        this.genres = genre;
        // console.log(this.genres);
      });
  }

  onClickGenre(id: string) {
    this.isClicked = true;
    this.getGenreSubscription = this._genreService
      .getGenreById(id)
      .subscribe((genre) => {
        // console.log(genre);
        this.clickedId = genre['_id'];
        this.genreCount++;
      });

    this.addGenreSubscription = this._genreService
      .addGenre(id)
      .subscribe((genre) => {
        // console.log(genre);
      });
  }

  goOnNext() {
    if (this.genreCount >= 1) {
      this.router.navigate(['/movies/recommend']);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Please select one genres',
        showConfirmButton: false,
        timer: 4000,
      });
    }
  }

  ngOnDestroy(): void {
    this.listGenreSubscription.unsubscribe();
    if (this.getGenreSubscription) {
      this.getGenreSubscription.unsubscribe();
    }
    if (this.addGenreSubscription) {
      this.addGenreSubscription.unsubscribe();
    }
  }
}
