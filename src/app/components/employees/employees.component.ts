import {Component, OnInit, ViewChild} from '@angular/core';
import {Employee} from '../../interfaces/employee';
import {EmployeeService} from '../../services/employee.service';
import {ApiService} from '../../services/api.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ModalComponent} from '../modal/modal.component';
import {MatDialog} from '@angular/material/dialog';
import {Positions} from '../../interfaces/positions';
import {DialogTypes} from '../../enums/dialog-types';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})


export class EmployeesComponent implements OnInit {
  isLoading = true;
  dataSource: MatTableDataSource<Employee>;
  jobPositions: Positions[];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'position', 'dateOfBirth', 'action'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private employeeService: EmployeeService,
              private positionApiService: ApiService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployees()
      .subscribe({
        next: employees => [this.dataSource = new MatTableDataSource<Employee>(employees), this.getJobPositions()],
        error: error => console.log('Chyba, nelze získat data o zaměstnancích'),
        complete: () => [
          this.isLoading = false,
          this.dataSource.paginator = this.paginator,
          this.dataSource.sort = this.sort
        ]
      });
  }

  /* ToDo: Na zvážení zda-li nebýt zavislý přímo na externí API.*
  * Lepší je možná uložit data z API do db a případně v určených intervalech aktualizovat *
  */
  getJobPositions(): void {
    this.positionApiService.getJobPositions()
      .subscribe({
        next: positions => this.jobPositions = positions,
        error: error => console.log('Chyba, nelze získat data')
      });

  }

  onRowClicked(row): void {
    this.openEditDialog(row);
  }

  onAddButtonClicked(): void {
    this.openAddDialog();
  }

  onRemoveButtonClicked(row): void {
    this.openDeleteDialog(row);
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
        dialogType: DialogTypes.EDIT
      }
    }).afterClosed().subscribe((result) => {
      this.refreshData(result, DialogTypes.EDIT);
    });
  }

  openDeleteDialog(data): void {
    this.dialog.open(ModalComponent, {
      data: {
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        selectedPosition: data.position,
        position: this.jobPositions,
        dateOfBirth: data.dateOfBirth,
        dialogType: DialogTypes.REMOVE
      }
    }).afterClosed().subscribe((result) => {
      this.refreshData(result, DialogTypes.REMOVE);
    });
  }

  openAddDialog(): void {
    this.dialog.open(ModalComponent, {
      data: {
        dialogType: DialogTypes.CREATE,
        position: this.jobPositions
      }
    }).afterClosed().subscribe((result) => {
      this.refreshData(result, DialogTypes.CREATE);
    });
  }

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  refreshData(employee: Employee, dialogType: string): void {
    if (dialogType === DialogTypes.EDIT) {
      const id = employee.id;
      const employeeIndex = this.dataSource.data.findIndex(data => data.id === id);
      this.dataSource.data[employeeIndex] = employee;
    }

    if (dialogType === DialogTypes.REMOVE) {
      const id = employee.id;
      const employeeIndex = this.dataSource.data.findIndex(data => data.id === id);
      this.dataSource.data.splice(employeeIndex, 1);
    }

    if (dialogType === DialogTypes.CREATE) {
      this.dataSource.data.push(employee);
    }
    this.dataSource.data = [...this.dataSource.data];
  }
}
