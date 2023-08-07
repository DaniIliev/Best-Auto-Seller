import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { UserDetails } from '../types/userDetails';
import { User } from '../types/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userDetails: UserDetails | undefined;
  username: string | undefined
  user: User | undefined
  constructor(private userService: UserService) {
    this.user = this.userService.user
  }

  ngOnInit(): void {
  }
}
