import { Component } from '@angular/core';
import { EMAIL_DOMAINS } from 'src/app/shared/emailDomains';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { envirenment } from 'src/app/environment/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  appEmailDomains = EMAIL_DOMAINS

  constructor(private userService: UserService, private router: Router){}

  login(form: NgForm):void {
    if(form.invalid){
      return 
    }
    const {email, password} = form.value

    this.userService.login(email!,password!).subscribe({
      next: (responce) => {
        localStorage.setItem(envirenment.user, JSON.stringify(responce))
        this.router.navigate(['/'])
      },
      error: (error) => {
        return alert(error)
      }
    })
  }
}
