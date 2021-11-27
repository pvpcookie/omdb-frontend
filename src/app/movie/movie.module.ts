import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { CommonModule } from '@angular/common';
import { MovieRoutingModule } from 'src/app/movie/movie-routing.module';
import { SearchComponent } from 'src/app/movie/components/search/search.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon' 
import { MatCardModule } from '@angular/material/card';
import { OmdbInterceptor } from 'src/app/movie/interceptors/omdb.Interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MovieService } from 'src/app/movie/services/movie.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ResultComponent } from 'src/app/movie/components/result/result.component';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [
    SearchComponent,
    ResultComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MovieRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatRippleModule,
    MatDialogModule,
    MatGridListModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: OmdbInterceptor, multi: true },
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}},
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},
    MovieService
  ]
})
export class MovieModule { }
