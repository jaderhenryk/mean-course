import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../security/user/user.service';

@Component({
  selector: 'mean-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {}

  getUser() {
    return this.userService.getUser()
  }

  logout() {
    this.userService.logout()
    this.userService.handleLogin()
  }

}
