import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieService } from 'src/app/movie/services/movie.service';
import { OmdbParams } from 'src/app/interfaces/omdb-params.interface';
import { ActivatedRoute, Router, ParamMap, Params } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { API_LOADER } from 'src/app/configurations/loader.configuration';
import { MatLoader } from 'src/app/interfaces/mat-loader.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Movie } from 'src/app/classes/movie.class';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  /**
   * Loading state
   * @var {boolean}
   */
  public loading:boolean = false;

 /**
   * Active Movie
   * @var {boolean}
   */
  public movie:Movie | null = null;

  /**
   * query
   * @var {OmdbParams}
   */
  public query:OmdbParams = {t:'',plot:'full'} as OmdbParams;

 /**
   * Subscriptions list
   * @var {Subscription[]}
   */
  public loader_options:MatLoader = API_LOADER;;

  /**
   * Subscriptions list
   * @var {Subscription[]}
   */
  private _subscriptions:Subscription[] = [];

  /**
   * Push subscription to list
   * @param {Subscription}
   * @return {void}
   */
  public set subscriptions(subscription:Subscription)
  {  
    this._subscriptions.push(subscription);
  } 

 /**
  * Get list of movie results
  * @return {Observable<Movie[]>}
  */
  public get movie_results():Observable<Movie[]>
  {
    return this._movie.results$;
  }


 /**
  * check service has results
  * @return {boolean}
  */
  public get has_results():boolean
  {
    return this._movie.movies.length > 0;
  }

  constructor(
    private _movie:MovieService,
    private _router:Router,
    private _active_route:ActivatedRoute,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { 


  }

  /**
   * Apply all filers and fetch results
   * @param {boolean}
   */
  public applyFilters(reset = false)
  {

    if(reset)
    {

      this.query.t = '';
      this.query.plot = 'full';   
      this.movie = null;   

    }

    this._router.navigate([], {
      relativeTo:this._active_route,
      queryParams:this.query,
      queryParamsHandling: 'merge'
    });

  }

  /**
   * Attempt to find queried movie 
   * @return {void}
   */
  public search()
  {  

    this.loading = true;
    this._movie.searchByTitle(this.query)
        .then((request) => {
          
          if(request.hasOwnProperty('Response') && request.Response === 'False')
          {
            throw new DOMException(request.Error)
          }

          this.movie = Movie.fromRequest(request);
          this._movie.addMovie(this.movie);

        })
        .catch(error => this._snackBar.open(error.message))
        .finally(() => this.loading = false);

  }

  ngOnInit(): void {

      this.subscriptions = this._active_route.queryParams.subscribe((params:Params)=> {

        Object.keys(params).forEach( param_key => {

          if(this.query.hasOwnProperty(param_key))
          {

            /**
             * Fix (this.query as any) for:
             * Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'OmdbParams'.
             */
            (this.query as any)[param_key] = params[param_key];

          }

        });

        /**
         * if query search has at lease on character search
         */
        if(this.query.t.length > 0)
        {
          this.search();
        }
        
        

    });

  }

  ngOnDestroy(): void {
    this._subscriptions.forEach( (subscription:Subscription) => subscription.unsubscribe() );
  }


}
