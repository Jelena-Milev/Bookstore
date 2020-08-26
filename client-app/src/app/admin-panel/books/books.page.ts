import { Component, OnInit } from "@angular/core";
import { Book } from "./book.model";
import { BooksService } from "./books.service";
import { ModalController, AlertController, LoadingController } from "@ionic/angular";
import { BookDescComponent } from "./book-desc/book-desc.component";
import { Router } from '@angular/router';
import { BooksPageRoutingModule } from './books-routing.module';

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
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router
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

  onViewDescription(book: Book) {
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

  onAddBook() {
    this.router.navigate(['admin-panel','tabs', 'books','new']);
  }

  onDeleteBook(book: Book){
    if(!book.inStock){
      this.alertCtrl.create({
        message:'Knjiga nije na prodaju',
        buttons:[
          {
            text: "OK",
            role: 'cancel'
          }
        ]
      }).then(alert=>{
        alert.present();
      })
      return;
    }
    this.alertCtrl.create({
      header: "Brisanje knjige",
      message: "Da li zaista zelite da obrisete knjigu "+book.title,
      buttons: [
        {
          text: 'Nazad',
          role: 'cancel'
        },
        {
          text: 'Obrisi',
          handler: () => {
            this.loadingCtrl.create({
              message: 'Brisanje knjige...'
            }).then(loadingEl=>{
              loadingEl.present();
              this.booksService.deleteBook(book.id).subscribe(res=>{
                loadingEl.remove();
                this.router.navigate(['admin-panel', 'tabs', 'books']);
              })
            })            
          }
        }
      ]
    }).then(alert=>{
      alert.present();
    })
  }
}
