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
    email: '',
    country: ''
  }
  countries: any[] = [];

  constructor(
    private countryService: CountryService
  ) {

  }

  ngOnInit(): void {
    this.countryService.getCountries()
      .pipe(first())
      .subscribe(response => {
        this.countries = response;
        // console.log(this.countries);

        this.countries.unshift({
          name: '[Selecciones un país]',
          code: ''
        });
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
