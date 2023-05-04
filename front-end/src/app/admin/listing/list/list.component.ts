import {
  Component,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MoviesComponent } from '../movies/movies.component';
import { GenresComponent } from '../genres/genres.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  @ViewChild('list', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;



  pages = {
    movie: 'movie',
    genre: 'genre',
  };

  isEdit: boolean = false;
  ngOnInit(): void {}

  onCreateComponent(event: Event) {
    const component = (event.target as HTMLInputElement).value;
    this.container.clear();
    const componentType = this.getComponentType(component.toLowerCase());
    this.container.createComponent(componentType);
  }

  getComponentType(name: string): Type<string> {
    let type: Type<any> = MoviesComponent;
    switch (name) {
      case this.pages.movie: {
        type = MoviesComponent;
        break;
      }
      case this.pages.genre: {
        type = GenresComponent;
      }
    }
    return type;
  }

 
}
