import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDetails } from 'src/app/types/userDetails';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  userDetails: UserDetails | undefined;
  isLoading:boolean = true
  username: string | undefined

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
  
  }

  getUserDetails() {
    const id = this.activatedRoute.snapshot.params['id'];
    console.log(id)

    this.userService.getAllUsers().subscribe({
      next: (users) => {
        users = Object.values(users);
        for (const user of users) {
          if (user.localId == id) {
            this.userDetails = user;
            this.username = this.userService.username
            this.isLoading = false
          }
        }
      },
    });
  }
}
