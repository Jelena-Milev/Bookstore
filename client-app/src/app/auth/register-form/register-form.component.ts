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
    password: new FormControl("", [Validators.required]),
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    streetAndNo: new FormControl("", [Validators.required]),
    city: new FormControl("", [Validators.required]),
    zipCode: new FormControl("", [Validators.required]),
    phone: new FormControl("", [Validators.required]),
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
    const firstName: string = this.registerForm.get("firstName").value;
    const lastName: string = this.registerForm.get("lastName").value;
    const streetNameAndNumber: string = this.registerForm.get("streetAndNo")
      .value;
    const city: string = this.registerForm.get("city").value;
    const zipCode: string = this.registerForm.get("zipCode").value;
    const phone: string = this.registerForm.get("phone").value;

    this.loadingCtrl
      .create({ message: "Registracija u toku..." })
      .then((loadingEl) => {
        loadingEl.present();
        this.authService
          .register(
            username,
            password,
            firstName,
            lastName,
            streetNameAndNumber,
            city,
            zipCode,
            phone
          )
          .subscribe(() => {
            this.alertCtrl
              .create({
                header: "Registracija",
                message: "Korisnik je uspesno registrovan. Moze se prijaviti.",
                buttons: [
                  {
                    text: "PRIJAVA",
                    role: "cancel",
                    handler: () => {
                      this.segment.emit('login');
                    }
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
      header: 'Greska pri registraciji',
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
