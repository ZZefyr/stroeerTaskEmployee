import {Component, OnInit, Inject, Injectable} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {EmployeeService} from '../../services/employee.service';
import {Employee} from '../../interfaces/employee';
import {DataValidationService} from '../../services/data-validation.service';



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
  firstName = this.validation.firstName;
  lastName = this.validation.lastName;
  position = this.validation.position;
  dateOfBirth = this.validation.dateOfBirth;

  constructor(
    private employeeService: EmployeeService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalComponent>,
    private validation: DataValidationService) {
  }


/* ToDO: vykonat update, jen když se data nějak změní */
  update(data): void {
    delete data.dialogType;
    this.employee = data;
    this.employee.position = this.selectedValue;
    this.trimSpace(this.employee);
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
    this.trimSpace(this.employee);
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

  getPositionSelectValue(data): void {
    if (data.selectedPosition) {
      this.selectedValue = data.selectedPosition;
    }
  }

  getErrorMessage(): string{
    return this.validation.getErrorMessage();
  }

  trimSpace(obj: Employee): any {
    Object.keys(obj).map(k => obj[k] = typeof obj[k] === 'string' ? obj[k].trim() : obj[k]);
  }

  ngOnInit(): void {
    this.getPositionSelectValue(this.data);
  }

}

