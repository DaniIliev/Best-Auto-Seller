import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form = this.fb.group({
    username: ['', [Validators.required], Validators.minLength(3)],
    email: ['', [Validators.required]],
    // passGroup: this.fb.group(
    // {
    //   password: ['', Validators.required,Validators.minLength(6)];
    //   rePassword:['', [Validators.required]],
    // },
    // // {
    // //   // validators: []
    // // }
    // )
  })

constructor(private fb: FormBuilder){}
  register(){}
}
