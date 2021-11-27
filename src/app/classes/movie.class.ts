export class MovieClass {

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
	public Ratings:string|null = null;
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

	constructor(attributes:{[key:string]:any})
	{

		/**
		 * Assigned passes attributes to class
		 * Ignore if class does not have relative {key}
		 */
		Object.keys(attributes).forEach( (attribute_key:string):void =>{

			if(this.hasOwnProperty(attribute_key))
			{
				this[attribute_key] = attributes[attribute_key];
			}

		});

		return this;

	}

}
