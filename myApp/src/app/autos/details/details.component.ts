import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Auto } from 'src/app/types/Auto';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { Comment } from 'src/app/types/Comment';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  auto: Auto | undefined;
  comments: Comment[] | undefined;
  owner: boolean = false;
  username: string | undefined


  form = this.fb.group({
    postText: ['', [Validators.required, Validators.minLength(5)]],
  });

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  get isLoggedIn() {
    return this.userService.isLogged;
  }

  ngOnInit(): void {
    this.fetchAuto();
    this.getAllComments();
    this.username = this.userService.username
  }

  fetchAuto(): void {
    const id = this.activatedRoute.snapshot.params['autoId'];
    this.apiService.getAuto(id).subscribe((auto) => {
      this.auto = auto;
      if (auto.userId == this.userService.user?.localId) {
        this.owner = true;
      }
    });
  }

  getAllComments(): void {
    const id = this.activatedRoute.snapshot.params['autoId'];

    this.apiService.getAllComments(id).subscribe((comments) => {
      if (comments == null) {
        return;
      }
      this.comments = Object.values(comments);
    });
  }

  postComment() {
    const id = this.activatedRoute.snapshot.params['autoId'];
    const { postText } = this.form.value;

    this.apiService.postComment(id, postText!, this.username!).subscribe({
      next: () => {
        this.form.reset();
        this.getAllComments();
        this.router.navigate([`/autos/${id}`]);
      },
      error: () => {
        this.router.navigate([`/autos/${id}`]);
      },
    });
  }

  deleteFn() {
    const id = this.activatedRoute.snapshot.params['autoId'];

    this.apiService.deleteAuto(id).subscribe({
      next: () => {
        this.router.navigate(['autos']);
      },
    });
  }

  contact() {
    this.router.navigate([`/autos/contacts/${this.auto?.userId}`]);
  }
  edit() {
    const id = this.activatedRoute.snapshot.params['autoId'];
    this.router.navigate([`/autos/${id}/edit`]);
  }
}
