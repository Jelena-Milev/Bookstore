import { Component, OnInit } from "@angular/core";
import { CartItem } from "./cart-item.model";
import { CartService } from "./cart.service";
import { AuthService } from '../auth/auth.service';

@Component({
  selector: "app-cart",
  templateUrl: "./cart.page.html",
  styleUrls: ["./cart.page.scss"],
})
export class CartPage implements OnInit {
  cartItems: CartItem[];
  isLoading: boolean;
  itemsPerPage: number = 7;
  cp: number = 1;
  totalPrice: number = 0;

  constructor(private cartService: CartService, private authService: AuthService,) {}

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
    this.cartService.getItems().subscribe(()=>{
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
}
