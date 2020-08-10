import { Component, OnInit } from '@angular/core';
import { Employee } from '../../interfaces/employee';
import { EmployeeService } from '../../services/employee.service';
import { ApiService } from '../../services/api.service';



@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})

export class EmployeesComponent implements OnInit {
  dataSource: Employee[];
  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'position', 'dateOfBirth'];

  getEmployees(): void {
    this.employeeService.getEmployees()
      .subscribe(employees => this.dataSource = employees);
  }




}
