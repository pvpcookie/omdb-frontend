import { MovieRating } from 'src/app/classes/movie-rating.class';

export class Movie {

	public Title:string|null = null;
	public Year:string|null = null;
	public Rated:string|null = null;
	public Released:string|null = null;
	public Runtime:string|null = null;
	public Genre:string|null = null;
	public Director:string|null = null;
	public Writer:string|null = null;
	public Actors:string|null = null;
	public Plot:string|null = null;
	public Language:string|null = null;
	public Country:string|null = null;
	public Awards:string|null = null;
	public Poster:string|null = null;
	
	public Metascore:string|null = null;
	public imdbRating:string|null = null;
	public imdbVotes:string|null = null;
	public imdbID:string|null = null;
	public Type:string|null = null;
	public DVD:string|null = null;
	public BoxOffice:string|null = null;
	public Production:string|null = null;
	public Website:string|null = null;
	public Response:string|null = null;

	/**
	 * use listed props to build an iterator for a data list
	 */
	private readonly _data_list:any[] = [
		'Year',
		'Rated',
		'Released',
		'Runtime',
		'Genre',
		'Director',
		'Writer',
		'Actors',
		'Language',
		'Country',
		'Awards',
		'Metascore',
		'imdbRating',
		'imdbVotes',
		'Type',
		'DVD',
		'BoxOffice',
		'Production'
	];

	private _Ratings:any[]|null = null;

	constructor(attributes?:any) {
		console.log(attributes)
		Object.keys(attributes).forEach((attribute_key) => {

			/**
			 * Assign public properties 
			 */
			if(this.hasOwnProperty(attribute_key))
			{	
				(this as any)[attribute_key] = attributes[attribute_key];	
			}

			/**
			 * Assign private properties 
			 */
			if(this.hasOwnProperty(`_${attribute_key}`))
			{
				(this as any)[`_${attribute_key}`] = attributes[attribute_key];	
			}

		});

		return this;

  	}	

  	/**
  	 * Get list of data for datasheet
	 * @return {any[]}
  	 */
  	public get data_sheet():any[]
  	{
  		return this._data_list.reduce( (data_sheet,entry_key) => {

  			if(this.hasOwnProperty(entry_key))
  			{
  				data_sheet.push({
  					key: entry_key,
  					value: (this as any)[entry_key]
  				});
  			}

  			return data_sheet;

  		},[])
  	}

  	public get id():string
  	{
  		return `${this.imdbID}`;
  	}

  	public get Ratings():MovieRating[]
  	{

  		if(!this._Ratings)
  		{
  			return [];
  		}

  		return this._Ratings.map( rating => new MovieRating(rating) );
  		
  	}


	public static fromRequest(request:string|object):Movie
	{	
		return new Movie(request);
	}

}
