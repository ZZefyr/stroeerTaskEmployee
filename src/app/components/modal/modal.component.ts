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

  constructor(
    private employeeService: EmployeeService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  openDialog(data): void {
    this.dialog.open(ModalComponent, {
      data: {
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        position: data.position,
        dateOfBirth: data.dateOfBirth,
      }
    });
  }

  save(data): void {
    this.updatedEmployee = data;
    console.log(this.updatedEmployee);
    this.employeeService.updateEmployee(this.updatedEmployee);
  }

  ngOnInit(): void {
  }

}

