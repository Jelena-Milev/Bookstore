import { Component, OnInit } from "@angular/core";
import { Book } from "./book.model";
import { BooksService } from "./books.service";
import { ModalController, AlertController, LoadingController, ToastController } from "@ionic/angular";
import { BookDescComponent } from "./book-desc/book-desc.component";
import { Router } from '@angular/router';

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
    private toastCtrl: ToastController,
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
    this.booksService.getBooks().subscribe();
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

  onSearchTextTyped(){
    this.cp = 1;
  }

  onAddBook() {
    this.router.navigate(['admin-panel','tabs', 'books','new']);
  }

  onEditBook(bookId:number){
    this.router.navigate(['admin-panel','tabs', 'books','edit', bookId]);
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
      message: "Da li zaista želite da povučete iz prodaje knjigu "+book.title,
      buttons: [
        {
          text: 'Nazad',
          role: 'cancel'
        },
        {
          text: 'Da',
          handler: () => {
            this.loadingCtrl.create({
              message: 'Povlačenje knjige iz prodaje...'
            }).then(loadingEl=>{
              loadingEl.present();
              this.booksService.deleteBook(book.id).subscribe(res=>{
                loadingEl.dismiss();
                this.router.navigate(['admin-panel', 'tabs', 'books']);
                this.showToastMessage('Knjiga je uspešno povučena iz prodaje.')
              },
              (errorRes)=>{
                loadingEl.dismiss();
                this.showErrorMessage('Greška pri povlačenju knjige iz prodaje', errorRes.error.message);
              })
            })            
          }
        }
      ]
    }).then(alert=>{
      alert.present();
    })
  }

  private showErrorMessage(headerMsg: string, errorMsg: string){
    this.alertCtrl.create({
      header: headerMsg,
      message: errorMsg,
      buttons:[
        {
          text: 'OK',
          role: 'cancel'
        }
      ]
    }).then(alertEl=>{
      alertEl.present();
    })
  }

  private showToastMessage(message: string){
    this.toastCtrl
        .create({
          message: message,
          buttons: [
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
