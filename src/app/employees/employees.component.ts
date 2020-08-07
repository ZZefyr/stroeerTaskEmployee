import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  employee: Employee = {
    id: 1,
    firstName: 'Zdeněk',
    lastName: 'Vojkůvka',
    position: 'Developer',
    dateOfBirth: '22.04.1990'
  };

  constructor() { }

  ngOnInit(): void {
  }

}
