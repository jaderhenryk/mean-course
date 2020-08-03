import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'mean-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      password: this.formBuilder.control('')
    })
  }

  login(formData: any) {
    this.userService.login(formData.email, formData.password).subscribe(
      user => {
        console.log(`Olá ${user.name}`)
        this.router.navigate([''])
      },
      error => console.log(error)
    )
  }

}
