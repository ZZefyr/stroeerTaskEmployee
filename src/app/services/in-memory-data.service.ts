import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const employees = [
      { id: 1, firstName: 'Honza', lastName: 'Mičurenko', position: 'full-stack developer', dateOfBirth: '1990-04-22'},
      { id: 2, firstName: 'David', lastName: 'Vozataj', position: 'full-stack developer', dateOfBirth: '1989-04-22'},
      { id: 3, firstName: 'Rostislav', lastName: 'Hromdotoho', position: 'full-stack developer', dateOfBirth: '1989-04-22'},
      { id: 4, firstName: 'John', lastName: 'Doe', position: 'sw admin', dateOfBirth: '1990-04-22'},
      { id: 5, firstName: 'Mirek', lastName: 'Stovoda', position: 'help desk', dateOfBirth: '1990-04-22'},
      { id: 6, firstName: 'Vratislav', lastName: 'Vylejmito', position: 'scrum master', dateOfBirth: '1989-01-15'},
      { id: 7, firstName: 'George', lastName: 'Skočdopole', position: 'product manager', dateOfBirth: '1989-03-22'},
      { id: 8, firstName: 'František', lastName: 'Vezehnůj', position: 'full-stack developer', dateOfBirth: '1998-08-11'}
    ];
    return {employees};
  }

}
