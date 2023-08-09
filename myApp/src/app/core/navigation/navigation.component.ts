import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  constructor(private userService: UserService, private router: Router) {}

 get getLocalId(){
    return this.userService.user?.localId;
  }

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/']);
  }

  ngOnInit():void{

  }

  goToProfile(){
    this.router.navigate([`user/profile/${this.getLocalId}`])
  }
}
