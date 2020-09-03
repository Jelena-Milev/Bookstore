import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { LoadingController } from "@ionic/angular";
import { BooksService } from "src/app/admin-panel/books/books.service";
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
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.authService.userIsAuthenticated.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });
    this.authService.role.subscribe((role) => {
      this.userRole = role;
    });
    this.cartService.cartItemsCount.subscribe((count) => {
      this.cartItemsCount = count;
    });
  }

  onLogout() {
    this.authService.logout();
  }
}
