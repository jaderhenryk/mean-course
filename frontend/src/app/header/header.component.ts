import { Component, OnInit } from '@angular/core';
import { UserService } from '../security/user/user.service';
import { Router } from '@angular/router';
import { User } from '../security/user/user.model';

@Component({
  selector: 'mean-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private user: User

  constructor(private userService: UserService, private router: Router) {
    userService.user.subscribe(user => this.user = user)
  }

  ngOnInit() {
  }

  getUser() {
    return {name: this.user.name, email: this.user.email}
  }

  logout() {
    this.userService.logout()
    console.log('Au revoir!!!');
    this.router.navigate(['/auth/login'])
  }

}
