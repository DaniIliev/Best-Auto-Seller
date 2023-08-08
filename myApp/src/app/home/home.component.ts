import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { UserDetails } from '../types/userDetails';
import { User } from '../types/user';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userDetails: UserDetails | undefined;
  username: string | undefined;
  user: User | undefined;
  currentDate: string | null | undefined;
  currentTime: string | null | undefined;
  createt_at: string = '07.06.2023'
  constructor(private userService: UserService, public datePipe: DatePipe) {
    this.user = this.userService.user;
  }

  ngOnInit(): void {
    
    this.currentDate = this.datePipe.transform(new Date(), 'MM/dd/yyyy');
    this.currentTime = this.datePipe.transform(new Date(), 'h:mm:ss');
  }
}
