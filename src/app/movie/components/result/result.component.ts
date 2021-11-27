import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { Movie } from 'src/app/classes/movie.class';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  /**
   * Movie input
   * @var {Movie}
   */
  @Output('reset')
  public reset:EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * Movie input
   * @var {Movie}
   */
  @Input('movie')
  public movie:Movie = {} as Movie;

  /**
   * Base grid columns
   * @var {number}
   */
  public columns = 3;

  constructor() { }

  ngOnInit(): void {
    this.breakPoints()
  }

  /**
   * Set columns base on break points
   * Angular material grid system is not responsive ? 
   * @todo research possible cause for this. 
   */
  public breakPoints() {
    switch(true) {
      case (window.innerWidth <= 480):
      this.columns = 1;
      break;
      case (window.innerWidth > 480 && window.innerWidth <= 640):
      this.columns = 1;
      break;
      case (window.innerWidth > 640 && window.innerWidth <= 992):
      this.columns = 1;
      break;
      default:
      this.columns = 3;
    }

  }

  /**
   * Send reset filter event to show search
   * @return {void}
   */
  public back()
  {
    this.reset.emit(true);
  }

  public onResize(event:any) {
    this.breakPoints();
  }

}
