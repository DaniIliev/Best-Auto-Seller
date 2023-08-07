import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Auto } from 'src/app/types/Auto';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { Comment } from 'src/app/types/Comment';
import { User } from 'src/app/types/user';
import { Like } from 'src/app/types/like';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  auto: Auto | undefined;
  comments: Comment[] | undefined;
  owner: boolean = false;
  username: string | undefined;
  likes: Like[] | undefined;
  localId: string | undefined
  userAlreadyLiked: boolean = false;
  isLoading:boolean = true

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
    this.getLikes();
    this.getUserDetails()
    this.localId = this.userService.user?.localId
  }

  fetchAuto(): void {
    const id = this.activatedRoute.snapshot.params['autoId'];
    this.apiService.getAuto(id).subscribe((auto) => {
      this.auto = auto;
      if (auto.userId == this.userService.user?.localId) {
        this.owner = true;
      }
      this.isLoading = false
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

  postLike() {
    const id = this.activatedRoute.snapshot.params['autoId'];

    this.apiService.postLike(id, this.localId!).subscribe({
      next: () => this.getLikes()
    });
  }
  unLike() {
    const id = this.activatedRoute.snapshot.params['autoId'];
    for (const like of this.likes!) {
      if (like.localId == this.localId) {
        const likeId = like.id;
        this.apiService.unLike(id, likeId).subscribe({
          next: () =>{
            this.getLikes()
            this.userAlreadyLiked = false
            this.router.navigate([`/autos/${id}`])

          }
        });
      }
    }
  }

  getLikes() {
    const id = this.activatedRoute.snapshot.params['autoId'];

    this.apiService.getAllLikes(id).subscribe({
      next: (likes) => {
        if (likes == null) {
          return;
        }
        let ids = Object.keys(likes);
        this.likes = Object.values(likes);
        this.likes = this.apiService.getArrayValuesLike(this.likes, ids);
        for (const like of this.likes) {
          if (like.localId == this.localId) {
            this.userAlreadyLiked = true;
          }
        }
      },
    });
  }

  deleteFn() {
    const id = this.activatedRoute.snapshot.params['autoId'];
    if(confirm('Are you sure?')){
      this.apiService.deleteAuto(id).subscribe({
        next: () => {
          this.router.navigate(['autos']);
        },
      });
    }
  }

  contact() {
    this.router.navigate([`/autos/contacts/${this.auto?.userId}`]);
  }
  edit() {
    const id = this.activatedRoute.snapshot.params['autoId'];
    this.router.navigate([`/autos/${id}/edit`]);
  }

  getUserDetails(){
    this.userService.getAllUsers().subscribe({
        next: (users) => {
          for (const user of Object.values(users)) {
              if(user.localId == this.localId){
               this.username = user.username
              }
          }
        }
    })
  }
}
