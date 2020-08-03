import { Component, OnInit } from '@angular/core';
import { UserService } from '../security/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'mean-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {}

  getUser() {
    return this.userService.user
  }

  logout() {
    this.userService.logout()
    console.log('Au revoir!!!');
    this.router.navigate(['/auth/login'])
  }

}
