import { Component, OnInit } from "@angular/core";
import { CartItem } from "./cart-item.model";
import { CartService } from "./cart.service";
import { AuthService } from "../auth/auth.service";
import { OrdersService } from "../orders/orders.service";
import { LoadingController, AlertController, ToastController, ModalController } from "@ionic/angular";
import { Router } from "@angular/router";
import { PaymentDialogComponent } from './payment-dialog/payment-dialog.component';

@Component({
  selector: "app-cart",
  templateUrl: "./cart.page.html",
  styleUrls: ["./cart.page.scss"],
})
export class CartPage implements OnInit {
  cartItems: CartItem[];
  isLoading: boolean;
  itemsPerPage: number = 3;
  cp: number = 1;
  totalPrice: number = 0;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private ordersService: OrdersService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.cartService.cartItems.subscribe((items) => {
      this.cartItems = items;
      this.totalPrice = 0;
      this.cartItems.forEach((ci) => {
        this.totalPrice += ci.book.price * ci.quantity;
      });
      this.isLoading = false;
    });
  }

  ionViewWillEnter() {
    this.authService.autoLogin().subscribe();
    this.cartService.getItems().subscribe(() => {
      this.totalPrice = 0;
      this.cartItems.forEach((ci) => {
        this.totalPrice += ci.book.price * ci.quantity;
      });
    });
  }

  onDeleteItem(item: CartItem) {
    this.cartService.deleteItem(item.book).subscribe((items) => {
      this.cartItems = items;
      this.totalPrice = 0;
      this.cartItems.forEach((ci) => {
        this.totalPrice += ci.book.price * ci.quantity;
      });
    });
  }

  onBuyItems() {
    this.loadingCtrl
      .create({ message: "Porucivanje u toku..." })
      .then((loadingEl) => {
        loadingEl.present();
        this.ordersService.createOrder(this.cartItems).subscribe(
          (res) => {
            this.cartService.resetCartItemsCount();
            sessionStorage.clear();
            this.router.navigate(["/", "orders"]);
            loadingEl.dismiss();
            this.showToastMessage(`Narudzbenica je uspesno kreirana`)
          },
          (errorRes)=>{
            loadingEl.dismiss();
            this.showErrorMessage(errorRes.error.message);
          }
        );
      });
  }

  /*onBuyItems(){
    // this.modalCtrl.create({
    //   component: PaymentDialogComponent
    // }).then(modalEl => {
    //   modalEl.present();
    // })
    this.router.navigate(['/', 'cart', 'payment']);
  }*/

  private showErrorMessage(errorMsg: string){
    this.alertCtrl.create({
      header: 'Greska pri narucivanju knjiga',
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

  private showToastMessage(message: string){
    this.toastController
        .create({
          message: message,
          buttons: [
            {
              text: "OK",
              role: "cancel",
            },
          ],
          animated: true,
          duration: 2000,
        })
        .then((toast) => {
          toast.present();
        });
  }
}
