import { Component, OnInit, ViewChild } from "@angular/core";
import { Book } from "../admin-panel/books/book.model";
import { BooksService } from "../admin-panel/books/books.service";
import { GenresService } from "../admin-panel/genres/genres.service";
import { Genre } from "../admin-panel/genres/genre.model";
import { LoadingController, AlertController } from "@ionic/angular";
import { AuthService } from "../auth/auth.service";
import { forkJoin } from "rxjs";
import { tap } from "rxjs/operators";
import { IonContent } from '@ionic/angular';


@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  bestsellers: Book[] = [];
  books: Book[] = [];
  genres: Genre[] = [];
  cp: number = 1;
  booksPerPage: number = 9;

  userRole: string = "";
  isLoading: boolean = true;
  constructor(
    private authService: AuthService,
    private booksService: BooksService,
    private genresService: GenresService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.booksService.bestsellers.subscribe((books) => {
      this.bestsellers = books;
    });
    this.booksService.booksInStock.subscribe((books) => {
      this.books = books;
    });
    this.genresService.genres.subscribe((genres) => {
      this.genres = genres;
    });
    this.authService.role.subscribe((role) => {
      this.userRole = role;
    });
  }

  ionViewWillEnter() {
    this.cp=1;
    forkJoin([
      this.booksService.getBestsellers(),
      this.booksService.getBooksInStock(),
      this.genresService.getGenres(),
      this.authService.autoLogin(),
    ])
      .pipe(
        tap((res) => {
          this.isLoading = false;
        })
      )
      .subscribe();
  }

  onAllBooksSelected() {
    this.loadingCtrl
      .create({ message: "Ucitavanje knjiga..." })
      .then((loadingEl) => {
        loadingEl.present();
        this.booksService.getBooksInStock().subscribe(() => {
          loadingEl.dismiss();
          this.cp = 1;
        });
      });
  }

  onGenreSelected(genre: Genre) {
    this.loadingCtrl
      .create({ message: "Ucitavanje knjiga..." })
      .then((loadingEl) => {
        loadingEl.present();
        this.booksService.getBooksByGenre(genre.id).subscribe(() => {
          loadingEl.dismiss();
          this.cp = 1;
        });
      });
  }

  onPageChange(event){
    this.cp = event;
    this.content.scrollToTop(1000);
  }

  onSearchByTitle(){
    this.cp = 1;
  }
}
