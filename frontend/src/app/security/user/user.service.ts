import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { Observable } from 'rxjs';
import { MEAN_OAPI, MEAN_USER_KEY } from 'src/app/app.api';
import { tap, filter } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';

@Injectable()
export class UserService {

    user: User
    previousUrl: string;

    constructor(private httpClient: HttpClient, private router: Router) {
        this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e: NavigationEnd) => this.previousUrl = e.url);
    }

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

    handleLogin(path: string = this.previousUrl) {
        this.router.navigate(['/auth/login', path]);
    }

    isLoggedIn(): boolean {
        return this.user !== undefined
    }
}