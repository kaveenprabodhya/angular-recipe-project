import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponsedata, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  isLogingMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authServie: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLogingMode = !this.isLogingMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponsedata>;

    this.isLoading = true;

    if (this.isLogingMode) {
      authObs = this.authServie.login(email, password);
    } else {
      authObs = this.authServie.signup(email, password);
    }

    authObs.subscribe({
      next: (resData) => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      error: (err) => {
        this.error = err;
        this.isLoading = false;
      },
    });

    form.reset();
    this.error = null;
  }
}
