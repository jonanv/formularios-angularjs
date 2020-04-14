import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

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
}
