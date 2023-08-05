import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { UserDetails } from 'src/app/types/userDetails';
import { ApiService } from 'src/app/autos/api.service';
import { Auto } from 'src/app/types/Auto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userDetails: UserDetails | undefined;
  autos: Auto[] = []
  isEditMode: boolean = false;
  ids: string[] = [];

  isLoading:boolean = true
  constructor(private userService: UserService, private apiService: ApiService, private router: Router) {
    if(this.userService.userFirstRegistration){
     this.editMode()
    }
  }

  editMode(): void {
    this.isEditMode = true

  }
  
  ngOnInit(): void {
    console.log(this.isEditMode)
    this.findOne();
    this.findUserAutos()
  }
  submit(form: NgForm) {
    // form.setValue({
    //   city: this.userDetails?.city,
    //   email: this.userDetails?.email,
    //   phone: this.userDetails?.phone,
    //   country: this.userDetails?.contry,
    //   street: this.userDetails?.street
    // })
    let localId = this.userService.user?.localId;

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
          this.isEditMode = false
        }
        this.isLoading = false
      },
    });
  }

  findUserAutos(){
    const id = this.userService.user?.localId 

    this.apiService.getAllAutos().subscribe({
      next: (autos) => {
        const autoV =  Object.values(autos)
        const idsV = Object.keys(autos)
        autos = this.apiService.getArrayValues(autoV, idsV)

        for (const auto of autos) {
          if(auto.userId == id){
            this.autos?.push(auto)
          }
        }
      }
    })
  }

  redirectToDetails(id:string):void{
    this.router.navigate([`/autos/${id}`])
  }
}
