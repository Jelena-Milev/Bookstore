import { Component, OnInit } from "@angular/core";
import { CartItem } from "./cart-item.model";
import { CartService } from "./cart.service";
import { AuthService } from "../auth/auth.service";
import { OrdersService } from "../orders/orders.service";
import { LoadingController } from "@ionic/angular";
import { Router } from "@angular/router";

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
            sessionStorage.clear();
            this.router.navigate(["/", "orders"]);
            loadingEl.dismiss();
          },
          (error) => {
            loadingEl.dismiss();
            console.log(error);
          }
        );
      });
  }
}
