import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../../interfaces/employee';
import { EmployeeService } from '../../services/employee.service';
import { ApiService} from '../../services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Positions } from '../../interfaces/positions';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})


export class EmployeesComponent implements OnInit {
  isLoading = true;
  dataSource: MatTableDataSource<Employee>;
  jobPositions: Positions[];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'position', 'dateOfBirth'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private employeeService: EmployeeService,
    private positionApiService: ApiService,
    private dialog: MatDialog
    )
   {}

  ngOnInit(): void {
    this.getEmployees();
    this.getJobPositions();
  }

  getEmployees(): void {
    this.employeeService.getEmployees()
      .subscribe({
        next: employees =>  this.dataSource = new MatTableDataSource<Employee>(employees),
        error: error => console.log('Chyba, nelze získat data o zaměstnancích'),
        complete: () => [ this.isLoading = false, this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort]});
  }

  getJobPositions(): void {
    this.positionApiService.getJobPositions()
      .subscribe({
        next: positions => this.jobPositions = positions,
        error: error => console.log('Chyba, nelze získat data'),
        complete: () =>  console.log(this.jobPositions)
      });

  }

  onRowClicked(row): void {
    this.openEditDialog(row);
  }

  onAddButtonClicked(): void {
    this.openAddDialog();
  }

  openEditDialog(data): void {
    this.dialog.open(ModalComponent, {
      data: {
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        selectedPosition: data.position,
        position: this.jobPositions,
        dateOfBirth: data.dateOfBirth,
        dialogEdit: true
      }
    }).afterClosed().subscribe(() => {
      this.getEmployees();
    });
  }

  openAddDialog(): void {
    this.dialog.open(ModalComponent, {
      data: {
        dialogEdit: false,
        position: this.jobPositions
      }
    }).afterClosed().subscribe(() => {
      this.getEmployees();
    });
  }

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
