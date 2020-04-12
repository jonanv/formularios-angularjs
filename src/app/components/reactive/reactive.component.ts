import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  formReactive: FormGroup;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  get getFirstName() {
    return this.formReactive.get('firstName').invalid && this.formReactive.get('firstName').touched;
  }

  get getLastName() {
    return this.formReactive.get('lastName').invalid && this.formReactive.get('lastName').touched;
  }

  get getEmail() {
    return this.formReactive.get('email').invalid && this.formReactive.get('email').touched;
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
    this.submitted = true;
    console.log(this.formReactive.value);
  }

}
