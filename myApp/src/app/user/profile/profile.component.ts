import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { UserDetails } from 'src/app/types/userDetails';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userDetails: UserDetails | undefined;
  isEditMode: boolean = false;
  ids: string[] = [];
  isLoading:boolean = true
  constructor(private userService: UserService) {}

  editMode(): void {
    this.isEditMode = !this.isEditMode;
  }
  
  ngOnInit(): void {
    this.findOne();

  }
  submit(form: NgForm) {

    let localId = this.userService.user?.localId;
    // form.setValue({
    //   city: this.userDetails?.city,
    //   email: this.userDetails?.email,
    //   phone: this.userDetails?.phone,
    //   country: this.userDetails?.contry,
    //   street: this.userDetails?.street
    // })

    const { email, phone, country, city, street } = form.value;

    this.userService
      .postDetailsAboutUser(email, phone, country, city, street, localId!)
      .subscribe({
        next: (user) => {
          this.userDetails = user
          this.findOne()
          this.editMode()
        },
      });
  }


findOne() {
    const id = this.userService.user?.localId 

    this.userService.getAllUsers().subscribe({
      next: (users) => {
        users = Object.values(users);
        for (const user of users) {
          if (user.localId == id) {
            this.userDetails = user;
          }
        }
        if(!this.userDetails){
          this.editMode()
        }
        this.isLoading = false
      },
    });
  }
}
