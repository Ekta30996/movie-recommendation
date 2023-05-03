import { NgModule  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TypeaheadModule } from "ngx-bootstrap/typeahead";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './shared/auth/auth.service';
import { AuthGuard } from './shared/auth/auth.guard';
import { TokenInterceptorService } from './shared/auth/token-interceptor.service';
import { SharedModule } from './shared/shared.module';
import { MoviesModule } from './movies/movies.module';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TypeaheadModule.forRoot(),
    HttpClientModule,
    SharedModule,
    MoviesModule, 
    AppRoutingModule,
  ],
  providers: [AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    { provide: LocationStrategy, useClass: PathLocationStrategy }
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
