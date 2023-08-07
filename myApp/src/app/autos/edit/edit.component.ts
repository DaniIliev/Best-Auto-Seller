import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { Auto } from 'src/app/types/Auto';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  auto: Auto | undefined;
  owner: boolean = false;

  form = this.fb.group({
    brand: ['', [Validators.required]],
    description: ['', [Validators.required]],
    manufactureYear: ['', [Validators.required]],
    imageUrl:['' ,[Validators.required]],
    model: ['', [Validators.required]],
    motor: ['', [Validators.required]],
    type: ['', [Validators.required]],

  });
  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchAuto();
  }

  typeOption = [
    { value: 'Coupe', isSelected: false },
    { value: 'Sedan', isSelected: false },
    { value: 'Limosine', isSelected: false },
    { value: 'Combi', isSelected: false },
    { value: 'Suv', isSelected: false },
  ];

  motorOption = [
    { value: 'Benzin', isSelected: false },
    { value: 'Diesle', isSelected: false },
    { value: 'Hybrid', isSelected: false },
    { value: 'Electric', isSelected: false },
    { value: 'Suv', isSelected: false },
  ];

  fetchAuto(): void {
    const id = this.activatedRoute.snapshot.params['autoId'];
    this.apiService.getAuto(id).subscribe((auto) => {
      this.auto = auto;
      this.form.setValue({
        brand: this.auto.brand,
        model: this.auto.model,
        manufactureYear: this.auto.manufactureYear,
        imageUrl: this.auto.imageUrl,
        type: this.auto.type,
        motor: this.auto.motor,
        description: this.auto.description,
      });
      if (auto.userId == this.userService.user?.localId) {
        this.owner = true;
      }
    });
  }
  edit() {
    const id = this.activatedRoute.snapshot.params['autoId'];
    const userId = this.userService.user?.localId
    const {
      brand,
      description,
      manufactureYear,
      imageUrl,
      model,
      motor,
      type,
    } = this.form.value;

    this.apiService.editAuto(
      brand!,
      description!,
      manufactureYear!,
      imageUrl!,
      model!,
      motor!,
      type!,
      id, 
      userId!
    ).subscribe({
      next: () => this.router.navigate([`/autos/${id}`])
    });
  }
}
