import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { CartService } from "src/app/cart/cart.service";

@Component({
  selector: "app-orders-header",
  templateUrl: "./orders-header.component.html",
  styleUrls: ["./orders-header.component.scss"],
})
export class OrdersHeaderComponent implements OnInit {
  cartItemsCount: number = 0;

  constructor(
    private authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.cartService.cartItemsCount.subscribe((count) => {
      this.cartItemsCount = count;
    });
  }

  onLogout() {
    this.authService.logout();
  }
}
