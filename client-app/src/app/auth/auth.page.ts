import { Component, OnInit, ViewChild } from "@angular/core";
import { AuthService } from "./auth.service";
import { LoginFormComponent } from "./login-form/login-form.component";
import { RegisterFormComponent } from "./register-form/register-form.component";
import { AlertController, LoadingController } from "@ionic/angular";

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

  constructor(
    private authService: AuthService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.authService.userIsAuthenticated.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  ionViewWillEnter() {
    this.authService.autoLogin().subscribe();
  }

  onLogout() {
    this.alertCtrl
      .create({
        header: "Odjava",
        message: "Da li zaista želite da se odjavite?",
        buttons: [
          {
            text: "NE",
            role: "cancel",
          },
          {
            text: "DA",
            handler: () => {
              this.loadingCtrl
                .create({
                  message: "Odjavljivanje...",
                  duration: 500,
                })
                .then((loadEl) => {
                  loadEl.present();
                  this.loginForm?.resetForm();
                  this.registerForm?.resetForm();
                  this.authService.logout();
                });
            },
          },
        ],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }

  onSwitchToLogin(loginSegment: string) {
    this.segment = loginSegment;
  }
}
