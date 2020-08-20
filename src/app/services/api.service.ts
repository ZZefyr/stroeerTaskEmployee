import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Observable, of } from 'rxjs';
import { Positions } from '../interfaces/positions';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // API URL vytáhnout do configu
  private webApiPositionUrl = environment.apiJobPositionsUrl;

  constructor(private http: HttpClient) {
  }

  getJobPositions(): Observable <Positions[]> {
    return this.http.get<Positions[]>(this.webApiPositionUrl)
      .pipe(
        catchError(this.handleError<Positions[]>('getJobPositions', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}

