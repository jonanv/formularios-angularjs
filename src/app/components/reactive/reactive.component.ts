import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  formReactive: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.formReactive = this.formBuilder.group({
      firstName: ['', ],
      lastName: ['', ],
      email: ['', ],
    });
  }

  save() {
    console.log(this.formReactive.value);
  }

}
