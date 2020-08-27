import { Component, OnInit } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
import { BooksService } from 'src/app/admin-panel/books/books.service';
import { Book } from 'src/app/admin-panel/books/book.model';

@Component({
  selector: "app-book-detail",
  templateUrl: "./book-detail.page.html",
  styleUrls: ["./book-detail.page.scss"],
})
export class BookDetailPage implements OnInit {
  isLoading: boolean;
  bookToShow: Book;
  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private bookService: BooksService) {}

  ngOnInit() {
    this.isLoading = true;
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has("bookId")) {
        this.router.navigate(["home", "books"]);
        return;
      }
      const bookId = paramMap.get("bookId");
      this.bookService.getBookById(bookId).subscribe((book) => {
        this.bookToShow = book;
        this.isLoading = false;
      });
    });
  }
}
