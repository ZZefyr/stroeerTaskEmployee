import { Component, OnInit, Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../interfaces/employee';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

@Injectable({
  providedIn: 'root'
})



export class ModalComponent implements OnInit {
  updatedEmployee: Employee;
  isClosed: boolean;

  constructor(
    private employeeService: EmployeeService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  save(data): void {
    this.updatedEmployee = data;
    this.employeeService.updateEmployee(this.updatedEmployee)
     .subscribe({
      next: (result) =>  this.dialog.closeAll(),
      error: error => console.log('Chyba, nelze aktualizovat data o zaměstnancích'),
     });
  }

  ngOnInit(): void {
  }

}

