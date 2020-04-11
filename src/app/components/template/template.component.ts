import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  user = {
    firstName: '',
    lastName: '',
    email: ''
  }

  constructor(
    private countryService: CountryService
  ) {

  }

  ngOnInit(): void {
    this.countryService.getCountries()
      .pipe(first())
      .subscribe(response => {
        console.log(response);
      });
  }

  guardar(formTemplate: NgForm) {
    if (formTemplate.invalid) {
      Object.values(formTemplate.controls)
        .forEach(control => {
          control.markAllAsTouched();
        });
      return;
    }

    console.log(formTemplate.value);
  }

}
