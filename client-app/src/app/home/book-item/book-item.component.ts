import { Component, OnInit, Input } from "@angular/core";
import { Book } from "src/app/admin-panel/books/book.model";
import { CartService } from "src/app/cart/cart.service";
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-book-item",
  templateUrl: "./book-item.component.html",
  styleUrls: ["./book-item.component.scss"],
})
export class BookItemComponent implements OnInit {
  @Input() book: Book;

  constructor(
    private router: Router,
    public toastController: ToastController,
    private cartService: CartService
  ) {}

  ngOnInit() {}

  addToCart(event) {
    event.stopPropagation();
    event.preventDefault();
    this.cartService.addItem(this.book, 1).subscribe(() => {
      this.toastController
        .create({
          message: "Knjiga je uspesno dodata u korpu",
          buttons: [
            {
              text: "Pregled korpe",
              handler: () => {
                this.router.navigate(["/", "cart"]);
              },
            },
            {
              text: "OK",
              role: "cancel",
            },
          ],
          animated: true,
          duration: 5000,
        })
        .then((toast) => {
          toast.present();
        });
    });
  }
}
