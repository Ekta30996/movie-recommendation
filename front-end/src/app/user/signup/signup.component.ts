import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  usernamePattern = '^[A-Z][A-Za-z]{3,20}$';
  subscription!: Subscription

  constructor(private fb: FormBuilder,
    private router: Router,
    private __authService:AuthService ){}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: [
        '',
        [Validators.required, Validators.pattern(this.usernamePattern)],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
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
    this.__authService.signup(this.signupForm.value).subscribe(
      (res) => {
        if (res['status'] === 'SUCCESS') {
          if(!res['admin'])
          {
            Swal.fire({
              icon: 'success',
              title: 'Email has been send',
              showConfirmButton: false,
              timer: 4000,
            });
            localStorage.setItem('token', res['token']);
            this.router.navigate(['/movies'])
          }
          
        }  
      },
      (err) => {
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
}
