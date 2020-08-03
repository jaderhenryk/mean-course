import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { Observable } from 'rxjs';
import { MEAN_OAPI, MEAN_USER_KEY } from 'src/app/app.api';
import { tap } from 'rxjs/operators';

@Injectable()
export class UserService {

    user: User

    constructor(private httpClient: HttpClient) {}

    login(email: string, password: string): Observable<User> {
        return this.httpClient.post<User>(`${MEAN_OAPI}/login`, {email, password}).pipe(tap(user => {
            this.user = user
            localStorage.setItem(MEAN_USER_KEY, JSON.stringify(user))
        }))
    }

    signup(newUser: any): Observable<User> {
        return this.httpClient.post<User>(`${MEAN_OAPI}/signup`, newUser).pipe(tap(user => {
            this.user = user
            localStorage.setItem(MEAN_USER_KEY, JSON.stringify(user))
        }))
    } 

    logout() {
        this.user = undefined
        localStorage.removeItem(MEAN_USER_KEY)
    }
}