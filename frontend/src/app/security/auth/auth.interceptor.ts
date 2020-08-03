import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';
import { MEAN_API } from 'src/app/app.api';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private userService: UserService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {
        const user = this.userService.getUser()
        const isApiUrl = request.url.startsWith(MEAN_API)
        if (user && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: user.token
                }
            })
        }
        return next.handle(request)
    }
}