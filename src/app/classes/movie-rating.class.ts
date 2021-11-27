export class MovieRating
{

	public Source: string|null = null
	public Value: string|null = null

	constructor(attributes?:any) {

		Object.keys(attributes).forEach((attribute_key) => {

			/**
			 * Assign public properties 
			 */
			if(this.hasOwnProperty(attribute_key))
			{	
				(this as any)[attribute_key] = attributes[attribute_key];	
			}

		});

		return this;

  	}	
}