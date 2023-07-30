import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EMAIL_DOMAINS } from 'src/app/shared/emailDomains';
import { appEmailValidator } from 'src/app/shared/validators/app-email-validator';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, appEmailValidator(EMAIL_DOMAINS)]],

    password: ['', [Validators.required, Validators.minLength(6)]],
    rePassword: ['', [Validators.required , Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}
  register(): void {
    if (this.form.invalid) {
      return;
    }

    const { username, email, password, rePassword } = this.form.value;

    console.log('Register....');
  }
  ngOnInit(): void {
    console.log(EMAIL_DOMAINS);
  }
}
