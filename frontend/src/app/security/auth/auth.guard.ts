import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private userService: UserService) {}

  checkAuthentication(path: string): boolean {
    const isLogged = this.userService.isLoggedIn()
    if (!isLogged) {
      this.userService.handleLogin()
    }
    return isLogged
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkAuthentication(next.routeConfig.path);
  }
  canLoad(route: Route): boolean {
    return this.checkAuthentication(route.path);
  }
}
