import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const employees = [
      { id: 1, firstName: 'Honza', lastName: 'Mičurenko', position: 'full-stack developer'},
      { id: 2, firstName: 'David', lastName: 'Vozataj', position: 'full-stack developer'},
      { id: 3, firstName: 'Rostislav', lastName: 'Hromdotoho', position: 'full-stack developer'},
      { id: 4, firstName: 'John', lastName: 'Doe', position: 'sw admin'},
      { id: 5, firstName: 'Mirek', lastName: 'Stovoda', position: 'help desk'},
      { id: 6, firstName: 'Vratislav', lastName: 'Vylejmito', position: 'scrum master'},
      { id: 7, firstName: 'George', lastName: 'Skočdopole', position: 'product manager'},
      { id: 8, firstName: 'František', lastName: 'Vezehnůj', position: 'full-stack developer'}
    ];
    return {employees};
  }

}
