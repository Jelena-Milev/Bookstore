import { Component, OnInit } from "@angular/core";
import { AuthService } from "./auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.page.html",
  styleUrls: ["./auth.page.scss"],
})
export class AuthPage implements OnInit {
  segment: string = "login";
  isAuthenticated: boolean = false;

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
    this.authService.logout();
  }

  onSwitchToLogin(loginSegment: string){
    this.segment = loginSegment;
  }
}
