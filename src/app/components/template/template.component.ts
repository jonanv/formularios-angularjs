import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';

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

  constructor() { }

  ngOnInit(): void {
  }

  guardar(formTemplate: NgForm) {
    if(formTemplate.invalid) {
      return;
    }

    console.log(formTemplate.value);
  }

}
