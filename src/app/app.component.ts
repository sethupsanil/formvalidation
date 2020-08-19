import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5), ValidateName]],
      age: ['', [Validators.required, Validators.min(5), Validators.max(59)]],
      amount: ['0', [Validators.required]],
      gender: ['', [Validators.required]],
      feedback: ['', [Validators.required, Validators.maxLength(1000)]],

    });

  }


  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;


    if (this.registerForm.invalid) {
      return;
    }


    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
  calculateAmount() {
    const age = this.registerForm.get('age').value;
    let amount = 0;
    if (!isNaN(age)) {
      if (age > 4 && age < 31) {
        amount = (age * 2) + 100;
      } else if (age > 30 && age < 51) {
        amount = (age * 3) + 200;
      }
      if (age > 50 && age < 60) {
        amount = (age * 4) + 400;
      }
    } else {
      amount = 0;
    }
    this.registerForm.get('amount').setValue(amount);
  }
}
export function ValidateName(control: AbstractControl) {
  const value = control.value.toLowerCase();
  if ('admin' == value) {
    return { validFname: true };
  }
  return null;

}
