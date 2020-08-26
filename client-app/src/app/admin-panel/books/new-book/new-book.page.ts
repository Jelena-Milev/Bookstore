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

@Component({
  selector: "app-new-book",
  templateUrl: "./new-book.page.html",
  styleUrls: ["./new-book.page.scss"],
})
export class NewBookPage implements OnInit {
  @Input() title: string;
  @Input() mode: string;
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
    piecesAvailable: new FormControl(),
  });

  authors: Author[] = [];
  genres: Genre[] = [];
  publishers: Publisher[] = [];

  private imageSelected: File;

  constructor(
    private genresService: GenresService,
    private authorsService: AuthorsService,
    private publishersService: PublishersService,
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
    const inStock = this.bookForm.get("inStock").value;
    const imageUrl = "";
    const piecesAvailable = this.bookForm.get("piecesAvailable").value;

    this.loadingCtrl.create({message:'Cuvanje knjige'}).then((loadingElem)=>{
      loadingElem.present();
      this.bookService.saveBook(
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
        imageUrl,
        piecesAvailable,
      ).subscribe(()=>{
        loadingElem.remove();
        this.router.navigate(['admin-panel', 'tabs', 'books']);
      },
      (error)=>{
        loadingElem.remove();
        this.router.navigate(['admin-panel', 'tabs', 'books']);
      });
    })
    
  }

  onImageSelected(event) {
    this.imageSelected = <File>event.target.files[0];
  }
}
