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

  ionViewWillLeave(){
    this.cartService.updateSessionStorageItems();
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


  onBuyItems(){
    this.loadingCtrl
      .create({ message: "Provera dostupnosti knjiga..." })
      .then((loadingEl) => {
        loadingEl.present();
        this.ordersService.checkAvailability(this.cartItems).subscribe(
          () => {
            loadingEl.dismiss();
            this.showPaymentDialog(this.totalPrice, this.cartItems);
          },
          (errorRes)=>{
            loadingEl.dismiss();
            this.showErrorMessage(errorRes.error.message);
          }
        );
      });
  }

  private showPaymentDialog(paymentAmount: number, cartItems: CartItem[]){
    this.modalCtrl.create({
      component: PaymentDialogComponent,
      componentProps: {
        paymentAmount: paymentAmount, 
        cartItems: cartItems
      }
    }).then(modalEl=>{
      modalEl.present();
      return modalEl.onDidDismiss();
    })
  }

  incrementQty(item: CartItem) {
    item.quantity += 1;
    this.totalPrice += item.book.price;
    this.cartService.incrementCartItemsCount();
  }

  decrementQty(item: CartItem) {
    if (item.quantity === 1) {
      return;
    }
    item.quantity -= 1;
    this.totalPrice -= item.book.price;
    this.cartService.decrementCartItemsCount();
  }

  onItemQuantityChanged(item: CartItem){
    if(item.quantity <= 0){
      item.quantity = 1;
    }
    this.totalPrice = 0;
      this.cartItems.forEach((ci) => {
        this.totalPrice += ci.book.price * ci.quantity;
    });
  }

  private showErrorMessage(errorMsg: string){
    this.alertCtrl.create({
      header: 'Greška pri naručivanju knjiga',
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
