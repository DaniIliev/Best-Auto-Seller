import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { User } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { envirenment } from '../environment/environment';
import { UserDetails } from '../types/userDetails';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<User | undefined>(undefined);
  public user$ = this.user$$.asObservable();
  private userDetails$$ = new BehaviorSubject <UserDetails | undefined>(undefined)
  public userDetails$ = this.userDetails$$.asObservable()

  user: User | undefined;
  ids: string[] | undefined;
  username: string |undefined
  userDetails: UserDetails | undefined;

  subscription: Subscription | undefined;

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) {
    this.subscription = this.user$.subscribe((user) => {
      this.user = user;
      this.subscription = this.userDetails$.subscribe((user) => {
        this.userDetails = user
      })
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
    return this.user$$.next(undefined);
  }

  postDetailsAboutUser(
    username: string,
    phone: string,
    contry: string,
    city: string,
    street: string,
    localId: string
  ) {
    return this.http.post<UserDetails>(
      'https://my-angular-project-9f44d-default-rtdb.firebaseio.com/users.json',
      { username, phone, contry, city, street, localId }
    );
  }

  editDetailsAboutUser(
    username: string,
    phone: string,
    contry: string,
    city: string,
    street: string,
    localId: string,
    userId: string
  ) {

    return this.http.patch<UserDetails>(
      `https://my-angular-project-9f44d-default-rtdb.firebaseio.com/users/${userId}.json`,
      { username, phone, contry, city, street, localId, userId }
    );
  }

  getAllUsers() {
    return this.http
      .get<UserDetails[]>(
        'https://my-angular-project-9f44d-default-rtdb.firebaseio.com/users.json'
      )
  }

  getArrayValuesUsers(users: UserDetails[], ids: string[]) {
    for (let user of users) {
      user.userId = ids.shift();
    }
    return users;
  }


  isAuthenticated(){
    return this.user$$.next(JSON.parse(localStorage.getItem('user')!))
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
