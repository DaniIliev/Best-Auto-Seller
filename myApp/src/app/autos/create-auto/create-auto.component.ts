import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { UserService } from 'src/app/user/user.service';
import { Router } from '@angular/router';
import { UserDetails } from 'src/app/types/userDetails';

@Component({
  selector: 'app-create-auto',
  templateUrl: './create-auto.component.html',
  styleUrls: ['./create-auto.component.css'],
})
export class CreateAutoComponent implements OnInit {
  userId: string | undefined= ''
  userDetails: UserDetails | undefined
  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.userService.user?.localId;
  }

  submit(form: NgForm) {
    const {
      brand,
      model,
      manufactureYear,
      type,
      motor,
      imageUrl,
      description,
    } = form.value;

    // this.userService.getAllUsersAndFindOne().subscribe({
    //   next: () => {
    //     this.userDetails = this.userService.userDetails
    //   }
    // })

    this.apiService.postAuto(
      brand, model, manufactureYear, type, motor, imageUrl, description, this.userId
    ).subscribe({
      next: () => {
        this.router.navigate(['/autos'])
      },
      error: () => {
        this.router.navigate(['/404'])
      }
    })
  }
}
