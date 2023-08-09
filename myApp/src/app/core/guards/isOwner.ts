import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/autos/api.service';
import { UserService } from 'src/app/user/user.service';

@Injectable({ providedIn: 'root' })
export class isOwner implements CanActivate {

  constructor(private userService: UserService, private router: Router, private apiService: ApiService,) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> 
    {
    const id = route.params?.['autoId']
    this.apiService.getAuto(id).subscribe({
        next: (auto) =>{
            if(auto.userId != this.userService.user?.localId){
                this.router.navigate([`/error`])
            }
        }
    })
    return this.userService.isLogged
  }
}