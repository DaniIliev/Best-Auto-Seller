import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EMAIL_DOMAINS } from 'src/app/shared/emailDomains';
import { appEmailValidator } from 'src/app/shared/validators/app-email-validator';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { envirenment } from 'src/app/environment/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  successfulRegister: boolean = false
  form = this.fb.group({
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
    
    const { email, password, rePassword } = this.form.value;

    if(password !== rePassword){
      return alert('Password`s dont match!')
    }

    this.userService.register(email!, password!, rePassword!).subscribe({
      next: (responce) => {
        localStorage.setItem(envirenment.user, JSON.stringify(responce))
        this.successfulRegister = true
        setTimeout(() => {
          this.router.navigate([`/user/profile/${responce.localId}`])
        }, 1500);
      },
      error: (error) => {
        return alert(error.error.error.message)
      }
    }
    )
  }
  ngOnInit(): void {
  }
}
