import { Component, OnInit, ViewChild } from "@angular/core";
import { AuthService } from "./auth.service";
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';

@Component({
  selector: "app-auth",
  templateUrl: "./auth.page.html",
  styleUrls: ["./auth.page.scss"],
})
export class AuthPage implements OnInit {
  segment: string = "login";
  isAuthenticated: boolean = false;

  @ViewChild(LoginFormComponent) loginForm: LoginFormComponent;
  @ViewChild(RegisterFormComponent) registerForm: RegisterFormComponent;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.userIsAuthenticated.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  ionViewWillEnter() {
    this.authService.autoLogin().subscribe();
  }

  onLogout() {
    this.loginForm.resetForm();
    this.registerForm.resetForm();
    this.authService.logout();
  }

  onSwitchToLogin(loginSegment: string){
    this.segment = loginSegment;
  }
}
