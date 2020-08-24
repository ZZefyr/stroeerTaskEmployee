import { Injectable } from '@angular/core';
import {FormControl, Validators, AbstractControl} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DataValidationService {

  firstName = new FormControl('', [Validators.required, Validators.minLength(2), this.removeSpaces]);
  lastName = new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern(/^\S*$/)]);
  position = new FormControl('', [Validators.required]);
  dateOfBirth = new FormControl('', [Validators.required]);

  removeSpaces(control: AbstractControl): object {
    if (control && control.value && !control.value.replace(/\s/g, '').length) {
      control.setValue('');
    }
    return null;
  }

  getErrorMessage(): string {
    if (this.firstName.hasError('required')) {
      return 'Musíte vložit hodnotu';
    }
    if (this.firstName.hasError('minlength')) {
      return 'Musíte vložit minimálně 2 znaky';
    }
    if (this.lastName.hasError('required')) {
      return 'Musíte vložit hodnotu';
    }
    if (this.lastName.hasError('minlength')) {
      return 'Musíte vložit minimálně 2 znaky';
    }
    if (this.position.hasError('required')) {
      return 'Musíte vybrat hodnotu';
    }
    if (this.dateOfBirth.hasError('required')) {
      return 'Musíte zadat datum narození';
    }
  }


  constructor() { }
}
