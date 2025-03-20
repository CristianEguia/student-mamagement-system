import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  
})
export class LoginComponent implements OnInit{
  form: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;


  constructor(private fb: FormBuilder, private authSrv: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    this.loading = true;

    const user = {
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value
    };

    this.authSrv.login(user)
      .pipe(first())
      .subscribe({
        next: (data) => {
          if (data) this.router.navigate(['/']);
        },
        error: (error)=>{
          this.loading=false;
        },
        complete: ()=>{
          this.loading = false;
        }
        
      })
  }
}
