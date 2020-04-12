import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
      firstName: ['', [
        Validators.required,
        Validators.minLength(5)
      ]],
      lastName: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
      ]],
    });
  }

  save() {
    console.log(this.formReactive.value);
  }

}
