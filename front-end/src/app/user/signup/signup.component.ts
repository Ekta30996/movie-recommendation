import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit, OnDestroy {
  signupForm!: FormGroup;
  usernamePattern = '^[A-Z][A-Za-z]{4,20}$';
  signupSubscription$!: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private __authService: AuthService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: [
        '',
        [Validators.required, Validators.pattern(this.usernamePattern)],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
      ],
    });
  }

  get username() {
    return this.signupForm.get('username');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  onSignup() {
    this.signupSubscription$ = this.__authService
      .signup(this.signupForm.value)
      .subscribe(
        (res) => {
          if (res['status'] === 'SUCCESS') {
            if (!res['admin']) {
              Swal.fire({
                icon: 'success',
                title: 'Please verify your email address',
                showConfirmButton: false,
                timer: 4000,
              });
              localStorage.setItem('token', res['token']);
              this.router.navigate(['/genre/genre']);
            }
          }
        },
        (err) => {
          console.log(err);

          if (err['status'] == '409') {
            Swal.fire({
              icon: 'error',
              title: 'User alredy exists',
              showConfirmButton: false,
              timer: 4000,
            });
          } else if (err['status'] == '0') {
            Swal.fire({
              icon: 'error',
              title: 'Server is not running',
              showConfirmButton: false,
              timer: 4000,
            });
          }
        }
      );
    this.signupForm.reset();
  }

  ngOnDestroy(): void {
    if (this.signupSubscription$) {
      this.signupSubscription$.unsubscribe();
    }
  }
}
