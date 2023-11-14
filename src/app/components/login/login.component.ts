import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  constructor (private userService: UserService, private router: Router, private loginService: LoginService) {
    this.formLogin = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
    });
  }

  ngOnInit(): void {
  }

  onSubmit () {
    this.loginService.login();
  }

  onClick () {
    this.userService.loginWithGoogle()
      
  }

  /* checkcontrol for email in formLogin */
  /* get email () {
    return this.formLogin.get('email');
  }
 */
  checkControl (controlName: string, errorName: string): boolean {
    if (
      this.formLogin.get(controlName)?.hasError(errorName) &&
      this.formLogin.get(controlName)?.touched
    ) {
      return true;
    } else {
      return false;
    }
  }
}
