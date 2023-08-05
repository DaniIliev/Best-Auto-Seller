import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { envirenment } from '../environment/environment';

@Component({
  selector: 'app-authenticated',
  templateUrl: './authenticated.component.html',
  styleUrls: ['./authenticated.component.css'],
})
export class AuthenticatedComponent implements OnInit {
  constructor(private userService: UserService) {}

  isAuthenticated = true;

  ngOnInit(): void {}
}
