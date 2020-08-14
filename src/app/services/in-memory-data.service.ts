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
      { id: 8, firstName: 'František', lastName: 'Vezehnůj', position: 'full-stack developer', dateOfBirth: '1998-08-11'},
      { id: 9, firstName: 'Ferdinand', lastName: 'Krupke', position: 'full-stack developer', dateOfBirth: '1978-06-09'},
      { id: 10, firstName: 'Mirek', lastName: 'Segedín', position: 'full-stack developer', dateOfBirth: '1948-08-11'},
      { id: 11, firstName: 'Josef', lastName: 'Šoupátko', position: 'product manager', dateOfBirth: '1990-04-22'},
      { id: 12, firstName: 'Alois', lastName: 'Nebel', position: 'full-stack developer', dateOfBirth: '1989-04-22'},
      { id: 13, firstName: 'Vítězslav', lastName: 'Lžička', position: 'full-stack developer', dateOfBirth: '1989-04-22'},
      { id: 14, firstName: 'Vít', lastName: 'Papoušek', position: 'sw admin', dateOfBirth: '1990-04-22'},
      { id: 15, firstName: 'Kamil', lastName: 'Kohoutek', position: 'help desk', dateOfBirth: '1990-04-22'},
      { id: 16, firstName: 'Hana', lastName: 'Kapavá', position: 'scrum master', dateOfBirth: '1989-01-15'},
      { id: 17, firstName: 'Pavla', lastName: 'Rýpavá', position: 'product manager', dateOfBirth: '1989-03-22'},
      { id: 18, firstName: 'Lenka', lastName: 'Ospalá', position: 'help desk', dateOfBirth: '1998-08-11'},
      { id: 19, firstName: 'Barbora', lastName: 'Zlá', position: 'help desk', dateOfBirth: '1978-06-09'},
      { id: 20, firstName: 'Susan', lastName: 'Smell', position: 'help desk', dateOfBirth: '1948-08-11'}
    ];
    return {employees};
  }

}
