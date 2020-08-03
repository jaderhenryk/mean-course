import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';
import { MEAN_API } from 'src/app/app.api';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private injector: Injector) {}

    intercept(request: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {
        const userService = this.injector.get(UserService)
        const user = userService.user
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