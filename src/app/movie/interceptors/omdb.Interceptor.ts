import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class OmdbInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    /**
     * Append OMDB API key to request
     */
    const clone_request = request.clone({
      url:`${request.url}&${environment.omdb.key_prefix}=${environment.omdb.key}`
    });

    return next.handle(clone_request);

  }

}