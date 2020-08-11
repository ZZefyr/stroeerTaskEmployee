import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Employee } from '../interfaces/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeeUrl = 'api/employees';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private http: HttpClient
  ) { }
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeeUrl)
      .pipe(
        catchError(this.handleError<Employee[]>('getEmployees', []))
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
