import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Genre } from 'src/app/shared/genre.interface';
import { GenresService } from 'src/app/shared/service/genres.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
  export class GenresComponent implements OnInit , OnDestroy {
    genres: Genre[] = [];
    loader: boolean = false;
    listGenres$!: Subscription;
    constructor(public _genreService: GenresService) {}
  
    ngOnInit(): void {
      this.loader = true;
      this.listGenres$ = this._genreService.loadGenre()
      .subscribe((genre) => {
          this.genres = genre;
          console.log(genre);
          this.loader = false;
        },
        (err) => {
          console.log(err);
          this.loader = false;
        }
      );
    }
  
    onDeleteGenre(id: string) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.loader = true;
          this._genreService.deleteGenre(id)
          .subscribe(
            (genre) => {
              this.loader = false
            },
            (err) => {  
              console.log(err)
              this.loader = false
            }
          );
          Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        }
      });
    }
    ngOnDestroy(): void {
      this.listGenres$.unsubscribe();
    }
}
