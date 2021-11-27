import { Component } from '@angular/core';
import { FloatingMovie } from 'src/app/interfaces/floating-movie.interface';
import { FLOATING_MOVIE_LIST } from 'src/app/configurations/background-list.configuration';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  /**
   * Application title
   * @var {string}
   */
  public title = 'omdb';

 /**
  * Floating move list for background
  * @var {FloatingMovie[]}
  */
  public floating_movie_list: FloatingMovie[] = FLOATING_MOVIE_LIST;

  constructor() {}

 /**
  * View single Movie
  * @param {FloatingMovie}
  * @todo find feature
  * @return {void}
  */
  public viewMovie(movie:FloatingMovie):void
  {
    alert(`movie id: ${movie.id}`)
  }

}
