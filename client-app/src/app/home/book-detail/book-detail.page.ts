import { Component, OnInit } from "@angular/core";
import { AlertController, LoadingController, ToastController } from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
import { BooksService } from "src/app/admin-panel/books/books.service";
import { Book } from "src/app/admin-panel/books/book.model";
import { CartService } from "src/app/cart/cart.service";
import { AuthService } from "src/app/auth/auth.service";

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
  userRole: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private bookService: BooksService,
    private cartService: CartService,
    private authService: AuthService,
    public toastController: ToastController,
    public alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.quantityForCart = 1;
    this.isLoading = true;
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has("bookId")) {
        this.router.navigate(["/", "home", "books"]);
        return;
      }
      const bookId = paramMap.get("bookId");
      this.bookService.getBookById(bookId).subscribe((book) => {
        this.bookToShow = book;
        this.segment = "description";
        this.isLoading = false;
        this.authService.role.subscribe((role) => {
          this.userRole = role;
        });
      }, (err)=>{
        this.router.navigate(['.', 'home']);
        this.alertCtrl.create({header:'Nije moguće prikazati podatke o traženoj knjizi',
        message: 'Tražena knjiga ne postoji', buttons:[
          {
            text: 'OK',
            role: 'cancel'
          }
        ]}).then(alertEl=>{
          alertEl.present();
        })
      });
    });
  }

  ionViewWillEnter() {
    this.authService.autoLogin().subscribe();
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

  onItemQuantityChanged(){
    if(this.quantityForCart <= 0){
      this.quantityForCart = 1;
    }
  }

  onAddToCart() {
    if(this.userRole === 'USER'){
      this.cartService
      .addItem(this.bookToShow, this.quantityForCart)
      .subscribe(() => {
        this.createToastMessage();
      });
    }else{
      this.router.navigate(['.', 'auth']);
    }    
  }

  createToastMessage() {
    this.toastController
      .create({
        message: "Knjiga je ubačena u korpu",
        buttons: [
          {
            side: "end",
            icon: "cart",
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
