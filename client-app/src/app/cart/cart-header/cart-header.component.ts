import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { BooksService } from "src/app/admin-panel/books/books.service";
import { LoadingController, AlertController } from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
  selector: "app-cart-header",
  templateUrl: "./cart-header.component.html",
  styleUrls: ["./cart-header.component.scss"],
})
export class CartHeaderComponent implements OnInit {
  searchText: string = "";

  isAuthenticated: boolean = false;
  cartItemsCount: number = 0;

  userRole: string = "";

  constructor(
    private authService: AuthService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private booksService: BooksService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.userIsAuthenticated.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });
    this.authService.role.subscribe((role) => {
      this.userRole = role;
    });
  }

  onLogout() {
    this.alertCtrl.create({
      header:'Odjava',
      message: 'Da li zaista zelite da se odjavite?',
      buttons:[
        {
          text: 'NE',
          role: 'cancel'
        },
        {
          text: 'DA',
          handler: () => {
            this.loadingCtrl.create({
              message: 'Odjavljivanje...',
              duration: 500
            }).then(loadEl=>{
              loadEl.present();
              this.authService.logout();
            })
          }
        },
      ]
    }).then(alertEl => {
      alertEl.present();
    })
  }

  onSearch() {
    this.loadingCtrl
      .create({ message: "Ucitavanje knjiga..." })
      .then((loadingEl) => {
        loadingEl.present();
        this.booksService.getBooksByTitle(this.searchText).subscribe(() => {
          this.router.navigate(['/', 'home']);
          loadingEl.dismiss();
        });
      });
  }
}
