import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../../interfaces/employee';
import { EmployeeService } from '../../services/employee.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';




@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})

export class EmployeesComponent implements OnInit {
  dataSource: MatTableDataSource<Employee>;
  constructor(private employeeService: EmployeeService) { }
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'position', 'dateOfBirth'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  ngOnInit(): void {
    this.getEmployees();
  }
  getEmployees(): void {
    this.employeeService.getEmployees()
      .subscribe({next: employees => this.dataSource = new MatTableDataSource<Employee>(employees),
        error: (error) => console.log('Chyba, nelze získat data o zaměstnancích'),
        complete: () => [this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort]});
  }
}
