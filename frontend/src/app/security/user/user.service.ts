import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from './user.model';
import { MEAN_OAPI, MEAN_USER_KEY } from '../../app.api';

@Injectable()
export class UserService {

    constructor(private httpClient: HttpClient, private router: Router) {}

    login(email: string, password: string): Observable<User> {
        return this.httpClient.post<User>(`${MEAN_OAPI}/login`, {email, password}).pipe(tap(user => {
            localStorage.setItem(MEAN_USER_KEY, JSON.stringify(user))
        }))
    }

    signup(newUser: any): Observable<User> {
        return this.httpClient.post<User>(`${MEAN_OAPI}/signup`, newUser).pipe(tap(user => {
            localStorage.setItem(MEAN_USER_KEY, JSON.stringify(user))
        }))
    } 

    logout() {
        localStorage.removeItem(MEAN_USER_KEY)
    }

    handleLogin() {
        this.router.navigate(['/auth/login']);
    }

    isLoggedIn(): boolean {
        return this.getUser() !== undefined
    }

    getUser() {
        const storedUser = localStorage.getItem(MEAN_USER_KEY)
        if (storedUser) {
            return JSON.parse(storedUser)
        }
        return undefined
    }
}