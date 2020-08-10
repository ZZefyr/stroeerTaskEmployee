import { Component, OnInit } from '@angular/core';
import { Employee } from '../../interfaces/employee';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  employees: Employee[];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees():void {
    this.employeeService.getEmployees()
      .subscribe(employees => this.employees = employees);
  }

}
