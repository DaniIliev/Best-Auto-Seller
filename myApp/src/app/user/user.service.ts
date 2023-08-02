import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { User } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { envirenment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user$$ = new BehaviorSubject<User | undefined>(undefined);
  public user$ = this.user$$.asObservable();

  user: User | undefined;

  regExp = /(@gmail.(com|bg)$)/
  username: string | undefined
  
  subscription: Subscription | undefined;

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) {
    this.subscription = this.user$.subscribe((user) => {
      this.user = user;
      this.username = this.user?.email.replace(this.regExp, '')
    });
  }

  register(
    email: string,
    password: string,
    rePassword: string
  ) {
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
    return this.user$$.next(undefined);
  }
}
