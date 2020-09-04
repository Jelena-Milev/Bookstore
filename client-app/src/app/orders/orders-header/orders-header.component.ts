import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { CartService } from "src/app/cart/cart.service";
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: "app-orders-header",
  templateUrl: "./orders-header.component.html",
  styleUrls: ["./orders-header.component.scss"],
})
export class OrdersHeaderComponent implements OnInit {
  cartItemsCount: number = 0;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.cartService.cartItemsCount.subscribe((count) => {
      this.cartItemsCount = count;
    });
  }

  onLogout() {
    this.alertCtrl.create({
      header:'Odjava',
      message: 'Da li zaista zelite da se odjavite?',
      buttons:[
        {
          text: 'NE',
          role: 'cancel'
        },
        {
          text: 'DA',
          handler: () => {
            this.loadingCtrl.create({
              message: 'Odjavljivanje...',
              duration: 500
            }).then(loadEl=>{
              loadEl.present();
              this.authService.logout();
            })
          }
        },
      ]
    }).then(alertEl => {
      alertEl.present();
    })
  }
}
