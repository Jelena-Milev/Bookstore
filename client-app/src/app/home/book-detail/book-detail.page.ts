import { Component, OnInit } from "@angular/core";
import { LoadingController, ToastController } from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
import { BooksService } from "src/app/admin-panel/books/books.service";
import { Book } from "src/app/admin-panel/books/book.model";
import { CartService } from "src/app/cart/cart.service";

@Component({
  selector: "app-book-detail",
  templateUrl: "./book-detail.page.html",
  styleUrls: ["./book-detail.page.scss"],
})
export class BookDetailPage implements OnInit {
  isLoading: boolean;
  bookToShow: Book;
  quantityForCart: number;
  segment: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private bookService: BooksService,
    private cartService: CartService,
    public toastController: ToastController,
  ) {}

  ngOnInit() {
    this.quantityForCart = 1;
    this.isLoading = true;
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has("bookId")) {
        this.router.navigate(["home", "books"]);
        return;
      }
      const bookId = paramMap.get("bookId");
      this.bookService.getBookById(bookId).subscribe((book) => {
        this.bookToShow = book;
        this.segment = "description";
        this.isLoading = false;
      });
    });
  }

  incrementQty() {
    this.quantityForCart += 1;
  }

  decrementQty() {
    if (this.quantityForCart === 1) {
      return;
    }
    this.quantityForCart -= 1;
  }

  onAddToCart() {
    this.cartService
      .addItem(this.bookToShow, this.quantityForCart)
      .subscribe(() => {
        this.toastController
          .create({
            message: "Knjiga je uspesno dodata u korpu",
            buttons: [
              {
                text: "Pregled korpe",
                handler: () => {
                  this.router.navigate(['/', 'cart']);
                },
              },
              {
                text: "OK",
                role: "cancel",
              },
            ],
            animated: true,
            duration: 5000
          })
          .then((toast) => {
            toast.present();
          });
      });
  }
}
