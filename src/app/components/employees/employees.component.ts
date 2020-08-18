import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../../interfaces/employee';
import { EmployeeService } from '../../services/employee.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ModalComponent } from '../modal/modal.component';




@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})

export class EmployeesComponent implements OnInit {
  isLoading = true;
  dataSource: MatTableDataSource<Employee>;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'position', 'dateOfBirth'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private employeeService: EmployeeService, public dialog: ModalComponent) { }
  ngOnInit(): void {
    this.getEmployees();
  }
  getEmployees(): void {
    this.employeeService.getEmployees()
      .subscribe({next: employees => this.dataSource = new MatTableDataSource<Employee>(employees),
        error: (error) => console.log('Chyba, nelze získat data o zaměstnancích'),
        complete: () => [ this.isLoading = false, this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort]});
  }
  onRowClicked(row): void {
    this.openDialog(row);
  }
  openDialog(data): void {
    this.dialog.openDialog(data);
  }
  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
