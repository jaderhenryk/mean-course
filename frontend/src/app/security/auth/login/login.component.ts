import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../../user/user.service';
import { NotifierService } from '../../../shared/notifier/notifier.service';

@Component({
  selector: 'mean-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private notifier: NotifierService) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      password: this.formBuilder.control('')
    })
  }

  login(formData: any) {
    this.userService.login(formData.email, formData.password).subscribe(
      user => this.notifier.successMessage(`Olá ${user.name}`),
      error => this.handleError(error),
      () => this.router.navigate([''])
    )
  }

  private handleError(httpError: HttpErrorResponse) {
    const errors = httpError.error.errors
    if (errors) {
      errors.forEach( err => this.notifier.errorMessage(err) )
    } else {
      this.notifier.errorMessage(httpError.error.message)
    }
  }

}
