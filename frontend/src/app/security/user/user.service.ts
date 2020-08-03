import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { Observable } from 'rxjs';
import { MEAN_OAPI, MEAN_USER_KEY } from 'src/app/app.api';
import { tap } from 'rxjs/operators';

@Injectable()
export class UserService {

    // private userSubject: BehaviorSubject<User>
    // user: Observable<User>
    user: User

    constructor(private httpClient: HttpClient) {
        // this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem(MEAN_USER_KEY)))
        // this.user = this.userSubject.asObservable() 
    }

    login(email: string, password: string): Observable<User> {
        return this.httpClient.post<User>(`${MEAN_OAPI}/login`, {email, password}).pipe(tap(user => {
            // this.userSubject.next(user)
            this.user = user
            localStorage.setItem(MEAN_USER_KEY, JSON.stringify(user))
        }))
    }

    signup(newUser: any): Observable<User> {
        return this.httpClient.post<User>(`${MEAN_OAPI}/signup`, newUser).pipe(tap(user => {
            // this.userSubject.next(user)
            this.user = user
            localStorage.setItem(MEAN_USER_KEY, JSON.stringify(user))
        }))
    } 

    logout() {
        this.user = undefined
        localStorage.removeItem(MEAN_USER_KEY)
        // this.userSubject.next(undefined)
    }

    // getUser():User {
        // return this.userSubject.value
    // }
}