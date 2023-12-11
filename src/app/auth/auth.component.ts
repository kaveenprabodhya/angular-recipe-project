import { Component, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponsedata, AuthService } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { AlertComponent } from '../shared/alert/alert.component';

// const componentConfig = [
//   {
//     component: AlertComponent,
//     inputs: { message: '' },
//   },
// ];

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent implements OnDestroy {
  isLogingMode = true;
  isLoading = false;
  error: string = null;
  private closeSub: Subscription;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

  constructor(private authServie: AuthService, private router: Router) {}

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

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
        this.showErrorAlert(err);
        this.isLoading = false;
      },
    });

    form.reset();
    this.error = null;
  }

  handleClose() {
    this.error = null;
  }

  private showErrorAlert(message: string) {
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(AlertComponent);
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
