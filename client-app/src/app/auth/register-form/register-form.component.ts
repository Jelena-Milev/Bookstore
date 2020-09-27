import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { LoadingController, AlertController } from "@ionic/angular";

@Component({
  selector: "app-register-form",
  templateUrl: "./register-form.component.html",
  styleUrls: ["./register-form.component.scss"],
})
export class RegisterFormComponent implements OnInit {
  registerForm = new FormGroup({
    username: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(8)]),
  });

  @Output() segment: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  onRegister() {
    const username: string = this.registerForm.get("username").value;
    const password: string = this.registerForm.get("password").value;

    this.loadingCtrl
      .create({ message: "Registracija u toku..." })
      .then((loadingEl) => {
        loadingEl.present();
        this.authService
          .register(
            username,
            password
          )
          .subscribe(() => {
            this.alertCtrl
              .create({
                header: "Registracija",
                message: "Korisnik je uspešno registrovan. Link za verifikaciju naloga je poslat na uneti imejl.",
                buttons: [
                  {
                    text: "OK",
                    role: "cancel",
                  },
                ],
              })
              .then((alertEl) => {
                alertEl.present();
                loadingEl.dismiss();
              });
          },
          (errorRes)=>{
            loadingEl.dismiss();
            this.showErrorMessage(errorRes.error.message);
          });
      });
  }

  resetForm(){
    this.registerForm.reset();
  }

  private showErrorMessage(errorMsg: string){
    this.alertCtrl.create({
      header: 'Greška pri registraciji',
      message: errorMsg,
      buttons:[
        {
          text: 'OK',
          role: 'cancel'
        }
      ]
    }).then(alertEl=>{
      alertEl.present();
    })
  }
}
