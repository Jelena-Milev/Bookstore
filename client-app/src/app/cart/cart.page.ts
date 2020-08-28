import { Component, OnInit } from "@angular/core";
import { CartItem } from "./cart-item.model";
import { CartService } from "./cart.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.page.html",
  styleUrls: ["./cart.page.scss"],
})
export class CartPage implements OnInit {
  cartItems: CartItem[];
  isLoading: boolean;
  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.isLoading = true;
    this.cartService.cartItems.subscribe((items) => {
      this.cartItems = items;
      this.isLoading = false;
    });
  }

  ionViewWillEnter() {
    this.cartService.getItems();
  }

  onDeleteItem(item: CartItem) {
    this.cartService.deleteItem(item.book).subscribe(items=>{
      this.cartItems = items;
    })
    
  }
}
