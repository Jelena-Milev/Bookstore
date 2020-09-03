import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
  });
  constructor(private authService: AuthService, private router:Router,
    private alertCtrl: AlertController) {}

  ngOnInit() {}

  onLogin(){
    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;
    this.authService.login(username, password).subscribe(() => {
      this.loginForm.reset();
      this.router.navigate(['/', 'home']);
    },
    (errorRes)=>{
      this.showErrorMessage(errorRes.error.message);
    });
  }

  resetForm(){
    this.loginForm.reset();
  }

  private showErrorMessage(errorMsg: string){
    this.alertCtrl.create({
      header: 'Greska pri prijavljivanju',
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
