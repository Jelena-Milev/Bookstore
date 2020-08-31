import { Component, OnInit } from "@angular/core";
import { Book } from "../admin-panel/books/book.model";
import { BooksService } from "../admin-panel/books/books.service";
import { GenresService } from "../admin-panel/genres/genres.service";
import { Genre } from '../admin-panel/genres/genre.model';
import { LoadingController } from '@ionic/angular';
import { CartService } from '../cart/cart.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  bestsellers: Book[] = [];
  books: Book[] = [];
  genres: Genre[] = [];
  cp: number = 1;
  booksPerPage: number = 9;

  userRole:string = '';
  
  
  constructor(
    private authService:AuthService,
    private booksService: BooksService,
    private genresService: GenresService,
    private loadingCtrl: LoadingController,
  ) {}

  ngOnInit(): void {
    this.booksService.bestsellers.subscribe((books) => {
      this.bestsellers = books;
    });
    this.booksService.booksInStock.subscribe((books) => {
      this.books = books;
    });
    this.genresService.genres.subscribe((genres)=>{
      this.genres = genres;
    })
    this.authService.role.subscribe(role=>{
      this.userRole = role;
    })
  }

  ionViewWillEnter() {
    this.booksService.getBestsellers().subscribe();
    this.booksService.getBooksInStock().subscribe();
    this.genresService.getGenres().subscribe();
    this.authService.autoLogin().subscribe();
  }

  onAllBooksSelected(){
    this.loadingCtrl.create({message: "Ucitavanje knjiga..."}).then((loadingEl)=>{
      loadingEl.present();
      this.booksService.getBooksInStock().subscribe(()=>{
        loadingEl.dismiss(); 
      })
    })
    
  }

  onGenreSelected(genre:Genre){
    this.loadingCtrl.create({message: "Ucitavanje knjiga..."}).then((loadingEl)=>{
      loadingEl.present();
      this.booksService.getBooksByGenre(genre.id).subscribe(()=>{
        loadingEl.dismiss(); 
      })
    })
  }
}
