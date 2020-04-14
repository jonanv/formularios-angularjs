import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  noVargas(control: FormControl): { [s: string]: boolean } {

    if (control.value?.toLowerCase() === 'vargas') {
      return {
        noVargas: true
      }
    }
    else {
      return null;
    }
  }

  passwordsEquals(password1: string, password2: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.controls[password1];
      const pass2Control = formGroup.controls[password2];

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      }
      else {
        pass2Control.setErrors({ noEquals: true });
      }
    }
  }
}
