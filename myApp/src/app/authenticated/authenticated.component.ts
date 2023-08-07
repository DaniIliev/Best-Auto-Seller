import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { envirenment } from '../environment/environment';

@Component({
  selector: 'app-authenticated',
  templateUrl: './authenticated.component.html',
  styleUrls: ['./authenticated.component.css'],
})
export class AuthenticatedComponent implements OnInit{
  isAuthenticated = true;

  constructor(private userService: UserService) {
    if (this.userService.isAuthenticated()) {
      this.isAuthenticated = false;
    }else{
      this.isAuthenticated = false
    }
  }

  ngOnInit(): void {}

}
