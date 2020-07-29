import { Component, OnInit } from '@angular/core';
import { UserService } from '../security/user/user.service';

@Component({
  selector: 'mean-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  getUser() {
    return {name: 'Jader Henryk', email: 'jaderhenryk@gmail.com'};
  }

  login() {
    console.log('Holá!!!');
  }

  logout() {
    console.log('Au revoir!!!');
  }

}
