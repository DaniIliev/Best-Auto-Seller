import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { UserService } from 'src/app/user/user.service';
import { Auto } from 'src/app/types/Auto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-auto',
  templateUrl: './create-auto.component.html',
  styleUrls: ['./create-auto.component.css'],
})
export class CreateAutoComponent implements OnInit {
  userId: string | undefined= ''
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

console.log(type,motor);


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
