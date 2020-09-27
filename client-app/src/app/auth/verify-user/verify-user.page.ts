import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: "app-verify-user",
  templateUrl: "./verify-user.page.html",
  styleUrls: ["./verify-user.page.scss"],
})
export class VerifyUserPage implements OnInit {

  isLoading: boolean;
  userDataForm = new FormGroup({
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    streetAndNo: new FormControl("", [Validators.required]),
    city: new FormControl("", [Validators.required]),
    zipCode: new FormControl("", [Validators.required]),
    phone: new FormControl("", [Validators.required]),
  });

  private userId: string;

  constructor(private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {}

  ngOnInit() {
    this.isLoading = true;
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has("userId")) {
        this.router.navigate([".", "home"]);
        return;
      }
      this.userId = paramMap.get('userId');
      this.authService.loadVerifyPage(this.userId).subscribe(() => {
        this.isLoading = false;
      }, (err)=>{
        this.router.navigate(['.', 'home']);
        this.alertCtrl.create({header:'Greška pri verifikaciji korisničkog naloga',
        message: err.error.message, buttons:[
          {
            text: 'OK',
            role: 'cancel'
          }
        ]}).then(alertEl=>{
          alertEl.present();
        })
      });
    });
  }

  onSubmit(){
    const firstName: string = this.userDataForm.get("firstName").value;
    const lastName: string = this.userDataForm.get("lastName").value;
    const streetNameAndNumber: string = this.userDataForm.get("streetAndNo")
      .value;
    const city: string = this.userDataForm.get("city").value;
    const zipCode: string = this.userDataForm.get("zipCode").value;
    const phone: string = this.userDataForm.get("phone").value;

      this.loadingCtrl
      .create({ message: "Verifikacija naloga u toku..." })
      .then((loadingEl) => {
        loadingEl.present();
        this.authService.verifyUserAccount(this.userId, firstName, lastName, streetNameAndNumber,
          city, zipCode, phone).subscribe(() => {
            this.alertCtrl
              .create({
                header: "Verifikacija",
                message: "Nalog je uspešno verifikovan. Možete se prijaviti.",
                buttons: [
                  {
                    text: "PRIJAVA",
                    role: "cancel",
                    handler: () => {
                      this.router.navigate(['.', 'auth']);
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

  private showErrorMessage(errorMsg: string){
    this.alertCtrl.create({
      header: 'Greška pri verifikaciji naloga',
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
