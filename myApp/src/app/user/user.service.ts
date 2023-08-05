import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { User } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { envirenment } from '../environment/environment';
import { UserDetails } from '../types/userDetails';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy{
  private user$$ = new BehaviorSubject<User | undefined>(undefined);
  public user$ = this.user$$.asObservable();

  user: User | undefined;
  ids: string[] | undefined;
  userDetails: UserDetails | undefined
  username: string| undefined

  regExp = /(@gmail.(com|bg)$)/;

  subscription: Subscription | undefined;

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) {
    this.subscription = this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  register(email: string, password: string, rePassword: string) {
    return this.http
      .post<User>(`/api:signUp?key=${envirenment.webApiKey}`, {
        email,
        password,
        rePassword,
        returnSecureToken: true,
      })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  login(email: string, password: string) {
    return this.http
      .post<User>(`/api:signInWithPassword?key=${envirenment.webApiKey}`, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  logout() {
    localStorage.removeItem(envirenment.user);
    this.username = undefined
    return this.user$$.next(undefined);
  }

  postDetailsAboutUser(
    email: string,
    phone: string,
    contry: string,
    city: string,
    street: string,
    localId: string
  ) {
    return this.http.post<UserDetails>(
      'https://my-angular-project-9f44d-default-rtdb.firebaseio.com/users.json',
      { email, phone, contry, city, street, localId }
    );
  }


  getAllUsers() {
    return this.http.get<UserDetails[]>(
      'https://my-angular-project-9f44d-default-rtdb.firebaseio.com/users.json')
  }



  getUsername(){

 this.username = this.user?.email.replace(this.regExp, '')
 return this.username
 
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

}
