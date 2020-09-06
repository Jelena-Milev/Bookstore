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
  @Input() userRole: string;
  constructor(
    private router: Router,
    public toastController: ToastController,
    private cartService: CartService
  ) {}

  ngOnInit() {}

  addToCart(event) {
    event.stopPropagation();
    event.preventDefault();
    if(this.userRole === 'USER'){
      this.cartService.addItem(this.book, 1).subscribe(() => {
        this.createToastMessage();
      });
    }else{
      this.router.navigate(['.', 'auth']);
    }    
  }

  createToastMessage(){
    this.toastController
        .create({
          message: "Knjiga je ubačena u korpu",
          buttons: [
            {
              side: 'end',
              icon: 'cart',
              text: "Pregledaj korpu",
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
          duration: 2000,
        })
        .then((toast) => {
          toast.present();
        });
  }
}
