import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidatorsService } from '../../services/validators.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  formReactive: FormGroup;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private validatorsService: ValidatorsService
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

  get getUser() {
    return this.formReactive.get('user').invalid && this.formReactive.get('user').touched;
  }

  get getPassword1() {
    return this.formReactive.get('password1').invalid && this.formReactive.get('password1').touched;
  }

  get getPassword2() {
    const password1 = this.formReactive.get('password1').value;
    const password2 = this.formReactive.get('password2').value;

    return (password1 === password2) ? false : true;
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
      lastName: ['', [
        Validators.required,
        this.validatorsService.noVargas
      ]],
      email: ['', [
        Validators.required,
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
      ]],
      user: ['', Validators.required, this.validatorsService.userExist],
      password1: ['', Validators.required],
      password2: ['', Validators.required],
      address: this.formBuilder.group({
        district: ['', Validators.required],
        city: ['', Validators.required]
      }),
      hobbies: this.formBuilder.array([])
    }, {
      validators: this.validatorsService.passwordsEquals('password1', 'password2')
    });
  }

  chargeDataForm() {
    // this.formReactive.setValue({
    this.formReactive.reset({
      firstName: "Giovanni",
      lastName: "Gonzalez",
      email: "jonan-vargas23@hotmail.com",
      password1: '123',
      password2: '123',
      address: {
        district: "Caldas",
        city: "Manizales"
      }
    });
    ['Programar', 'Jugar'].forEach( valor => this.getHobbies.push(this.formBuilder.control(valor) ));
  }

  hobbie() {
    this.getHobbies.push(
      this.formBuilder.control('', Validators.required)
    );
  }

  deleteHobbie(index: number) {
    this.getHobbies.removeAt(index);
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
