import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
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
  autos: Auto[] = [];
  isEditMode: boolean = false;
  userFirstRegistration: boolean = false;
  isLoading: boolean = true;

  form = this.fb.group({
    username: ['', [Validators.required , Validators.minLength(4)]],
    phone: ['', [Validators.required]],
    country: ['',[Validators.required]],
    city: ['', [Validators.required]],
    street: ['', [Validators.required]],
  });

  constructor(
    private userService: UserService,
    private apiService: ApiService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.findOne();
  }

  editMode(): void {
    this.isEditMode = !this.isEditMode;
  }
  
  findOne() {
    const localId = this.userService.user?.localId;
    this.autos = []
    this.isLoading = true
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        let ids: string[] = Object.keys(users);
        users = Object.values(users);
        users = this.userService.getArrayValuesUsers(users, ids);
        for (const user of users) {
          if (user.localId == localId) {
            this.userDetails = user;
            this.form.setValue({
              username: this.userDetails.username,
              phone: this.userDetails.phone,
              country: this.userDetails.contry,
              city: this.userDetails.city,
              street: this.userDetails.street,
            });
            this.findUserAutos()
          }
        }
        if (this.userDetails == undefined) {
          this.userFirstRegistration = true;
          this.isLoading = false
        }
      },
    });
  }

  findUserAutos() {
    const localId = this.userService.user?.localId;

    this.apiService.getAllAutos().subscribe({
      next: (autos) => {
        const autoV = Object.values(autos);
        const idsV = Object.keys(autos);
        autos = this.apiService.getArrayValues(autoV, idsV);

        for (const auto of autos) {
          if (auto.userId == localId) {
            this.autos?.push(auto);
          }
        }
        this.isLoading = false;
      },
    });
  }

  submit() {
    let localId = this.userService.user?.localId;
    const { username, phone, country, city, street } = this.form.value;

    this.userService
      .postDetailsAboutUser(
        username!,
        phone!,
        country!,
        city!,
        street!,
        localId!
      )
      .subscribe({
        next: (user) => {
          this.findOne();
          this.editMode();
          this.router.navigate(['/autos']);
        },
      });
  }

  edit() {
    const userId = this.userDetails?.userId;
    const localId = this.userService.user?.localId;
    const { username, phone, country, city, street } = this.form.value;
    this.userService
      .editDetailsAboutUser(
        username!,
        phone!,
        country!,
        city!,
        street!,
        localId!,
        userId!
      )
      .subscribe({
        next: () => {
          this.editMode();
          this.findOne();
        },
      });
  }

  back(): void {
    this.editMode();
  }

  redirectToDetails(id: string): void {
    this.router.navigate([`/autos/${id}`]);
  }
}
