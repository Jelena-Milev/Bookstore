import { Component, OnInit } from "@angular/core";
import { Book } from "../admin-panel/books/book.model";
import { BooksService } from "../admin-panel/books/books.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  bestsellers: Book[] = [];
  books: Book[] = [];
  cp: number = 1;
  booksPerPage:number = 8;

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.booksService.bestsellers.subscribe((books) => {
      this.bestsellers = books;
    });
    this.booksService.booksInStock.subscribe((books) => {
      this.books = books;
    });
  }

  ionViewWillEnter() {
    this.booksService.getBestsellers().subscribe();
    this.booksService.getBooksInStock().subscribe();
  }
}
