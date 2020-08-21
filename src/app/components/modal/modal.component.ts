import {Component, OnInit, Inject, Injectable} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {EmployeeService} from '../../services/employee.service';
import {Employee} from '../../interfaces/employee';

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
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalComponent>) {
  }


  update(data): void {
    delete data.dialogType;
    this.employee = data;
    this.employee.position = this.selectedValue;
    this.employeeService.updateEmployee(this.employee)
      .subscribe({
        next: () => this.dialogRef.close(data),
        error: error => console.log('Chyba, nelze aktualizovat data o zaměstnancích'),
      });
  }

  add(data): void {
    delete data.dialogType;
    this.employee = data;
    this.employee.position = this.selectedValue;
    this.employeeService.addEmployee(this.employee)
      .subscribe({
        next: (result) => this.dialogRef.close(result),
        error: error => console.log('Chyba, nelze přidat zaměstnance'),
      });
  }

  remove(data): void {
    this.employee = data;
    console.log(this.employee);
    this.employeeService.deleteEmployee(this.employee)
      .subscribe({
        next: () => this.dialogRef.close(data),
        error: error => console.log('Chyba, nelze odstranit zaměstnance')
      });
  }

  getDefaultSelectValue(data): void {
    if (data.selectedPosition) {
      this.selectedValue = data.selectedPosition;
    }
  }

  ngOnInit(): void {
    this.getDefaultSelectValue(this.data);
  }

}

