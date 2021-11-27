const buildQueryParams = (params:{[key:string]:any}) => {

    return Object.keys(params).reduce( (query_string,param_key) =>{

      if(params[param_key] === null )
      {
        return query_string
      }

      if(param_key === 'page')
      {
        params[param_key] -= 1;
      }

      return query_string  += `${param_key}=${params[param_key]}&`;

    },'?').replace(/\&$/, '');

}

export {
  buildQueryParams
};