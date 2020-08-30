import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { LoadingController } from '@ionic/angular';
import { BooksService } from 'src/app/admin-panel/books/books.service';

@Component({
  selector: 'app-book-detail-header',
  templateUrl: './book-detail-header.component.html',
  styleUrls: ['./book-detail-header.component.scss'],
})
export class BookDetailHeaderComponent implements OnInit {

  searchText: string = "";

  isAuthenticated: boolean = false;
  cartItemsCount: number = 0;

  userRole:string = '';

  constructor(private authService:AuthService, 
              private loadingCtrl: LoadingController,
              private booksService: BooksService,) { }

  ngOnInit() {
    this.authService.userIsAuthenticated.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    })
    this.authService.role.subscribe(role=>{
      this.userRole = role;
    })
  }

  onLogout(){
    this.authService.logout();
  }
}
