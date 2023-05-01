import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Genre } from 'src/app/shared/genre.interface';
import { GenresService } from 'src/app/shared/service/genres.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
  export class GenresComponent implements OnInit , OnDestroy  {


    genres: Genre[] = [];
    genreById!:Genre
    loader: boolean = false;
    listGenres$!: Subscription;
    isEdit:boolean = false;

    constructor(public _genreService: GenresService) {}
  
    ngOnInit(): void {
      this.loader = true;
      // this.listGenres$ = interval(5000)
      // .subscribe((genre)=>{
      //   this.listGenre()
      // })
      this.listGenres$ = this._genreService.loadGenre()
      .subscribe((genre) => {
          this.genres = genre;
          this.loader = false;
        },
        (err) => {
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

  
    onGetGenreById(id:string){
      this.isEdit = true;
      this._genreService.getGenreById(id)
      .subscribe(genre=>{
        this.genreById = genre
        // console.log('edit click',this.genreById);
        
      })
    }
    ngOnDestroy(): void {
      this.listGenres$.unsubscribe();
    }
}
