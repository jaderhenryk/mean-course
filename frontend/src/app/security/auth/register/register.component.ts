import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../user/user.service';
import { NotifierService } from '../../../shared/notifier/notifier.service';

@Component({
  selector: 'mean-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder, 
    private userService: UserService, 
    private router: Router,
    private notifier: NotifierService) { }

  formGroup: FormGroup

  passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/

  static equalsTo(group: AbstractControl): {[key: string]: boolean} {
    const password = group.get('password')
    const passwordConfirmation = group.get('passwordConfirmation')
    if (!password.value || !passwordConfirmation) {
      return undefined
    }
    if (password.value !== passwordConfirmation.value) {
      return {passwordNotMatch: true}
    }
    return undefined;
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(6)]),
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      password: this.formBuilder.control('', [Validators.required, Validators.minLength(6), Validators.maxLength(12), Validators.pattern(this.passwordRegex)]),
      passwordConfirmation: this.formBuilder.control('', [
        Validators.required, 
        Validators.minLength(6), 
        Validators.maxLength(12), 
        Validators.pattern(this.passwordRegex),
      ])
    }, {
      validators: [RegisterComponent.equalsTo]
    })
  }

  signup(formData: any) {
    this.userService.signup(formData).subscribe(
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
