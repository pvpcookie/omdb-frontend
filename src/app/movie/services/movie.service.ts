import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Movie } from 'src/app/classes/movie.class';
import { map } from 'rxjs';
import { OmdbParams } from 'src/app/interfaces/omdb-params.interface';
import { buildQueryParams } from 'src/app/helpers/build-query-param.helper';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  /**
   * Loading state
   * @var {Movie[]}
   */
  private readonly _movies:BehaviorSubject<Movie[]> = new BehaviorSubject<Movie[]>([] as Movie[])

  /**
  * nagivation service loading state
  * @var {Observable<Movie>}
  */
  public results$:Observable<Movie[]> = this._movies.asObservable()

  constructor(private _http:HttpClient) { }

  /**
   * Get Movies
   * @return {Movie[]}
   */ 
  public get movies():Movie[] {
    return this._movies.getValue();
  }

  /**
   * assigning a value to this.movies will push it onto the observable 
   * and down to all of its subsribers (ex: this.movies = [])
   * @return {Movie[]}
   */ 
  private set movies(movies:Movie[]) {
    this._movies.next(movies);
  }

  /**
   * Add movie to list
   * @param {Movie}
   * @return {void}
   */
  public addMovie(movie:Movie):void
  {

    let listed_movie = this.movies.find( listed_movie => listed_movie.id === movie.id );
    let movies = this.movies;

    /**
     * limit results to 5
     */
    if(movies.length >= 5)
    {
      movies.shift();
    }

    /**
     * If has old record remove old record to be replaced with new one
     */
    if(listed_movie)
    {
      this.removeMovie(movie);
    }

    this.movies = [...movies,movie];

  }

  /**
   * Remove a movie from list
   * @param {string}
   * @return {void}
   */
  public removeMovie(movie:Movie):void
  {
    this.movies = this.movies.filter( listed_movie => listed_movie.id !== movie.id);
  }

  /**
   * Attempt to find move by title
   * @todo move api key to interceptor
   */
  public searchByTitle(query_object:OmdbParams):Promise<any>
  {

    let query_string = buildQueryParams(query_object);
    return this._http.get(`${environment.omdb.host}${query_string}`).toPromise();

  }

}
