import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { GenresService } from "../../genres/genres.service";
import { AuthorsService } from "../../authors/authors.service";
import { PublishersService } from "../../publishers/publishers.service";
import { Author } from "../../authors/author.model";
import { Genre } from "../../genres/genre.model";
import { Publisher } from "../../publishers/publisher.model";
import { BooksService } from "../books.service";
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ImageService } from '../../image.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: "app-new-book",
  templateUrl: "./new-book.page.html",
  styleUrls: ["./new-book.page.scss"],
})
export class NewBookPage implements OnInit {
  @Input() title: string;
  bookForm: FormGroup = new FormGroup({
    isbn: new FormControl("", Validators.required),
    title: new FormControl("", Validators.required),
    price: new FormControl(null, [
      Validators.required,
      Validators.min(0.0000001),
    ]),
    numberOfPages: new FormControl(),
    binding: new FormControl(),
    publicationYear: new FormControl(),
    description: new FormControl("", Validators.required),
    publisherId: new FormControl(null, Validators.required),
    authorsIds: new FormControl(null, [
      Validators.required,
      Validators.minLength(1),
    ]),
    genresIds: new FormControl(null, [
      Validators.required,
      Validators.minLength(1),
    ]),
    inStock: new FormControl(),
    piecesAvailable: new FormControl(0, Validators.min(0)),
  });

  authors: Author[] = [];
  genres: Genre[] = [];
  publishers: Publisher[] = [];

  private imageSelected: File;

  constructor(
    private genresService: GenresService,
    private authorsService: AuthorsService,
    private publishersService: PublishersService,
    private imageService: ImageService,
    private bookService: BooksService,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {
    this.genresService.genres.subscribe((res) => {
      this.genres = res;
    });
    this.authorsService.authors.subscribe((res) => {
      this.authors = res;
    });
    this.publishersService.publishers.subscribe((res) => {
      this.publishers = res;
    });
  }

  ionViewWillEnter() {
    this.genresService.getGenres().subscribe();
    this.authorsService.getAuthors().subscribe();
    this.publishersService.getPublishers().subscribe();
  }

  onImageSelected(event) {
    this.imageSelected = <File>event.target.files[0];
  }

  onSaveBook() {
    const isbn = this.bookForm.get("isbn").value;
    const title = this.bookForm.get("title").value;
    const price = this.bookForm.get("price").value;
    const numberOfPages = this.bookForm.get("numberOfPages").value;
    const binding = this.bookForm.get("binding").value;
    const publicationYear = this.bookForm.get("publicationYear").value;
    const description = this.bookForm.get("description").value;
    const publisherId = this.bookForm.get("publisherId").value;
    const authorsIds = this.bookForm.get("authorsIds").value;
    const genresIds = this.bookForm.get("genresIds").value;
    const piecesAvailable = this.bookForm.get("piecesAvailable").value;
    let inStock: boolean;
    if(piecesAvailable <= 0){
      inStock = false;
    }else{
      inStock = this.bookForm.get("inStock").value;
    }

    this.loadingCtrl.create({message:'Cuvanje knjige'}).then((loadingElem)=>{
      loadingElem.present();
      if(this.imageSelected !== undefined){
        this.imageService.uploadImage(this.imageSelected).pipe(
          switchMap(uploadRes=>{
            return this.bookService.saveBook(
              isbn,
              title,
              price,
              numberOfPages,
              binding,
              publicationYear,
              description,
              publisherId,
              authorsIds,
              genresIds,
              inStock,
              uploadRes.imageUrl,
              piecesAvailable,
            )
          })
        ).subscribe(()=>{
          loadingElem.dismiss();
          this.router.navigate(['admin-panel', 'tabs', 'books']);
        },
        (error)=>{
          loadingElem.dismiss();
          this.router.navigate(['admin-panel', 'tabs', 'books']);
        });
      }else{
        return this.bookService.saveBook(
          isbn,
          title,
          price,
          numberOfPages,
          binding,
          publicationYear,
          description,
          publisherId,
          authorsIds,
          genresIds,
          inStock,
          "",
          piecesAvailable,
        ).subscribe(()=>{
      loadingElem.dismiss();
      this.router.navigate(['admin-panel', 'tabs', 'books']);
    },
    (error)=>{
      loadingElem.dismiss();
      this.router.navigate(['admin-panel', 'tabs', 'books']);
    });
      }
      
    })
    
  }
}
