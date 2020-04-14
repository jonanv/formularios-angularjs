import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

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
    this.chargeDataForm();
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

  get getDistrict() {
    return this.formReactive.get('address.district').invalid && this.formReactive.get('address.district').touched;
  }

  get getCity() {
    return this.formReactive.get('address.city').invalid && this.formReactive.get('address.city').touched;
  }

  get getHobbies() {
    return this.formReactive.get('hobbies') as FormArray;
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
      address: this.formBuilder.group({
        district: ['', Validators.required],
        city: ['', Validators.required]
      }),
      hobbies: this.formBuilder.array([
        [''], [''], [''], [''], ['']
      ])
    });
  }

  chargeDataForm() {
    // this.formReactive.setValue({
    this.formReactive.reset({
      firstName: "Giovanni",
      lastName: "Vargas",
      email: "jonan-vargas23@hotmail.com",
      address: {
        district: "Caldas",
        city: "Manizales"
      }
    });
  }

  save() {
    this.submitted = true;

    if (this.formReactive.invalid) {
      Object.values(this.formReactive.controls)
        .forEach(control => {

          if (control instanceof FormGroup) {
            Object.values(control.controls)
              .forEach(control => {
                control.markAllAsTouched();
              });
          }
          else {
            control.markAllAsTouched();
          }
        });
      return;
    }

    console.log(this.formReactive.value);
    this.formReactive.reset({
      firstName: "",
      lastName: "",
      email: "",
      address: {
        district: "",
        city: ""
      }
    });
  }

}
