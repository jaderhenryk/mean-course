import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { Observable } from 'rxjs';
import { MEAN_API } from 'src/app/app.api';
import { tap } from 'rxjs/operators';

@Injectable()
export class UserService {

    user: User

    constructor(private httpClient: HttpClient) {}

    login(email: string, password: string): Observable<User> {
        return this.httpClient.post<User>(`${MEAN_API}/login`, {email, password}).pipe(tap(user => this.user = user))
    }

    logout() {
        this.user = undefined
    }
}