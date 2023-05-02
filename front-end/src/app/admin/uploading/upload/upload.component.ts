import { Component, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { UploadGenreComponent } from '../upload-genre/upload-genre.component';
import { UploadMovieComponent } from '../upload-movie/upload-movie.component';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent {
  @ViewChild('upload', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  pages = {
    movie: ' upload movie',
    genre: 'upload genre',
  };

  ngOnInit(): void {}

  onCreateComponent(event: Event) {
    const component = (event.target as HTMLInputElement).value;
    this.container.clear();
    const componentType = this.getComponentType(component.toLowerCase());
    this.container.createComponent(componentType);
  }

  getComponentType(name: string): Type<string> {
    let type: Type<any> = UploadMovieComponent;
    switch (name) {
      case this.pages.movie: {
        type = UploadMovieComponent;
        break;
      }
      case this.pages.genre: {
        type = UploadGenreComponent;
      }
    }
    return type;
  }
}
