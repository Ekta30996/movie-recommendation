import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinForm!: FormGroup;

  constructor(private fb:FormBuilder,
    private router: Router,
    private _authservice:AuthService){}

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get email() {
    return this.signinForm.get('email');
  }

  get password() {
    return this.signinForm.get('password');
  }
  onSignin() {
    this._authservice.signin(this.signinForm.value).subscribe(
      (res) => {
        if (res['status'] === 'SUCCESS') {
          if(!res['admin'])
          {
            localStorage.setItem('token', res['token']);
            this.router.navigate(['/movies/home'])
            // console.log(res);
          }
          else if(res['admin']){
            localStorage.setItem('token', res['token']);
            this.router.navigate(['/admin/dashboard']) 
          }
        }  
        // Swal.fire({
        //   icon: 'success',
        //   title: 'Your work has been saved',
        //   showConfirmButton: false,
        //   timer: 1500
        // })
        localStorage.setItem('token',res['token'])
      },
      (err) => {
        if (err['status'] == '400') {
          Swal.fire({
            icon: 'error',
            title: 'Please verify your email',
            showConfirmButton: false,
            timer: 4000,
          });
        }
        else if (err['status'] == '401') {
          Swal.fire({
            icon: 'error',
            title: 'Invalid user credentials',
            showConfirmButton: false,
            timer: 4000,
          });
        }
        else if (err['status'] == '404') {
          Swal.fire({
            icon: 'error',
            title: 'User does not exists',
            showConfirmButton: false,
            timer: 4000,
          });
        }
        else if (err['status'] == '0') {
          Swal.fire({
            icon: 'error',
            title: 'Server is not running',
            showConfirmButton: false,
            timer: 4000,
          });
        }
      }
    );
    this.signinForm.reset();
  }
}
