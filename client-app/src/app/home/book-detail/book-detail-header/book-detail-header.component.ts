import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { LoadingController, AlertController } from "@ionic/angular";
import { CartService } from "src/app/cart/cart.service";

@Component({
  selector: "app-book-detail-header",
  templateUrl: "./book-detail-header.component.html",
  styleUrls: ["./book-detail-header.component.scss"],
})
export class BookDetailHeaderComponent implements OnInit {
  isAuthenticated: boolean = false;
  cartItemsCount: number = 0;

  userRole: string = "";

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.authService.userIsAuthenticated.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });
    this.authService.role.subscribe((role) => {
      this.userRole = role;
    });
    this.cartService.getItems().subscribe();
    this.cartService.cartItemsCount.subscribe((count) => {
      this.cartItemsCount = count;
    });
  }

  onLogout() {
    this.alertCtrl.create({
      header:'Odjava',
      message: 'Da li zaista želite da se odjavite?',
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
              this.cartService.resetCartItemsCount();
            })
          }
        },
      ]
    }).then(alertEl => {
      alertEl.present();
    })
  }
}
