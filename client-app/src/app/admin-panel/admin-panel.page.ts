import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { LoadingController, AlertController } from "@ionic/angular";

@Component({
  selector: "app-admin-panel",
  templateUrl: "./admin-panel.page.html",
  styleUrls: ["./admin-panel.page.scss"],
})
export class AdminPanelPage implements OnInit {
  selectedSegment: string = "publishers";

  constructor(
    private authService: AuthService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

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
}
