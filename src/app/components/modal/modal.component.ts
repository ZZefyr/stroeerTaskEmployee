import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  employee: Employee;
  selectedValue: string;

  constructor(
    private employeeService: EmployeeService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  update(data): void {
    this.employee = data;
    this.employeeService.updateEmployee(this.employee)
     .subscribe({
      next: (result) =>  this.dialog.closeAll(),
      error: error => console.log('Chyba, nelze aktualizovat data o zaměstnancích'),
     });
  }

  add(data): void {
    this.employee = data;
    this.employeeService.addEmployee(this.employee)
      .subscribe({
        next: (result) =>  this.dialog.closeAll(),
        error: error => console.log('Chyba, nelze přidat zaměstnance'),
      });
  }

  getDefaultSelectValue(data): void {
    console.log(data);
    this.selectedValue = data.selectedPosition;
  }

  ngOnInit(): void {
    this.getDefaultSelectValue(this.data);
  }

}

