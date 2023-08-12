import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/user/user.service';

@Injectable({ providedIn: 'root' })
export class AuthActivate implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> 
    {
      if(!this.userService.isLogged){
        this.router.navigate(['/user/login'])
      }
        this.userService.getAllUsers().subscribe({
          next: (users) => {
            for (const user of Object.values(users)) {
              if (user.localId == this.userService.user?.localId) {
                return
              }
            }
            this.router.navigate([`/user/profile/${this.userService.user?.localId}`])
          },
        });
      
      
    return this.userService.isLogged;
  }
}
