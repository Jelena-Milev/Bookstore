import { Component, OnInit } from "@angular/core";
import { Book } from "./book.model";
import { BooksService } from "./books.service";
import { ModalController, LoadingController } from "@ionic/angular";
import { BookDescComponent } from './book-desc/book-desc.component';

@Component({
  selector: "app-books",
  templateUrl: "./books.page.html",
  styleUrls: ["./books.page.scss"],
})
export class BooksPage implements OnInit {
  books: Book[];
  isLoading: boolean;
  searchText: string = "";
  cp: number = 1;
  itemsPerPage: number = 5;

  constructor(
    private booksService: BooksService,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.booksService.books.subscribe((res) => {
      this.books = res;
      this.isLoading = false;
    });
  }

  ionViewWillEnter() {
    this.booksService.getBooks().subscribe((books) => {
      console.log(this.books);
    });
  }

  onViewDescription(id:number){
    const index = this.books.findIndex(book => book.id === id);
    const book:Book = this.books[index];
    this.modalCtrl.create({
      component: BookDescComponent,
      componentProps: {
        title: book.title,
        authors: book.authorsNames,
        description: book.description
      }
    }).then((modalElem)=>{
      modalElem.present();
    })
  }

  onAddBook() {}
}
