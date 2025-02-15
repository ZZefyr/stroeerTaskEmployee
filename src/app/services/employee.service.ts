import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import { NotificationService } from './notification.service';
import { DataValidationService } from './data-validation.service';
import {Employee} from '../interfaces/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeeUrl = environment.apiEmployeeUrl;
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient,
              private notification: NotificationService,
              private validation: DataValidationService)
  {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeeUrl)
      .pipe(
        catchError(this.handleError<Employee[]>('getEmployees', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getEmployee(id: number): Observable<Employee> {
    const url = `${this.employeeUrl}/${id}`;
    return this.http.get<Employee>(url).pipe(
      tap(_ => console.log(`fetched Employee id=${id}`)),
      catchError(this.handleError<Employee>(`getEmployee id=${id}`))
    );
  }

  updateEmployee(employees: Employee): Observable<any> {
    return this.http.put(this.employeeUrl, employees, this.httpOptions)
      .pipe(
        tap(_ => this.notification.add(`Zaměstnanec ${employees.firstName} ${employees.lastName} s id ${employees.id}, byl aktualizován.`, 'info')),
        catchError(this.handleError<any>('updateEmployee', []))
      );
  }

  addEmployee(employees: Employee): Observable<any> {
    return this.http.post(this.employeeUrl, employees, this.httpOptions)
      .pipe(
        tap(_ => this.notification.add(`Zaměstnanec ${employees.firstName} ${employees.lastName}, byl přidán.`, 'success')),
        catchError(this.handleError<any>('addEmployee', []))
      );
  }

  deleteEmployee(employee: Employee): Observable<Employee> {
    const id = employee.id;
    const url = `${this.employeeUrl}${id}`;
    return this.http.delete<Employee>(url, this.httpOptions).pipe(
      tap(_ => this.notification.add(`Zaměstnanec ${employee.firstName} ${employee.lastName} s id ${employee.id}, byl odstraněn.`, 'info')),
      catchError(this.handleError<Employee>('deleteEmployee'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.notification.add(error, 'error')
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}
