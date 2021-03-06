import { Component, OnInit, Input } from "@angular/core";
import { GenresService } from "../../genres/genres.service";
import { AuthorsService } from "../../authors/authors.service";
import { PublishersService } from "../../publishers/publishers.service";
import { BooksService } from "../books.service";
import { LoadingController, AlertController, ToastController } from "@ionic/angular";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Author } from "../../authors/author.model";
import { Genre } from "../../genres/genre.model";
import { Publisher } from "../../publishers/publisher.model";
import { Book } from "../book.model";
import { ImageService } from "../../image.service";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "app-edit-book",
  templateUrl: "./edit-book.page.html",
  styleUrls: ["./edit-book.page.scss"],
})
export class EditBookPage implements OnInit {
  isLoading: boolean;

  bookForm: FormGroup = new FormGroup({
    isbn: new FormControl("", [
      Validators.required,
      Validators.minLength(13),
      Validators.maxLength(18),
      Validators.pattern("[0-9]{3}[-]?[0-9]{1,5}[-]?[0-9]{1,7}[-]?[0-9]{1,6}[-]?[0-9]{1}"),
    ]),
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

  private bookToEdit: Book;

  constructor(
    private activatedRoute: ActivatedRoute,
    private genresService: GenresService,
    private authorsService: AuthorsService,
    private publishersService: PublishersService,
    private bookService: BooksService,
    private imageService: ImageService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has("bookId")) {
        this.router.navigate(["admin-panel", "tabs", "books"]);
        return;
      }
      const bookId = paramMap.get("bookId");
      this.bookService.getBookById(bookId).subscribe((book) => {
        this.bookToEdit = book;
        this.initializeForm();
        this.isLoading = false;
      });
    });

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
    if (piecesAvailable <= 0) {
      inStock = false;
    } else {
      inStock = this.bookForm.get("inStock").value;
    }

    this.loadingCtrl
      .create({ message: "Čuvanje knjige..." })
      .then((loadingElem) => {
        loadingElem.present();
        if (this.imageSelected !== undefined) {
          this.imageService
            .uploadImage(this.imageSelected)
            .pipe(
              switchMap((uploadRes) => {
                return this.bookService.editBook(
                  this.bookToEdit.id,
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
                  piecesAvailable
                );
              })
            )
            .subscribe(
              () => {
                loadingElem.dismiss();
                this.bookForm.reset();
                this.router.navigate(["admin-panel", "tabs", "books"]);
                this.showToastMessage("Uspešno izmenjena knjiga.");
              },
              (errorRes) => {
                loadingElem.dismiss();
                // this.router.navigate(["admin-panel", "tabs", "books"]);
                this.showErrorMessage(
                  "Greška pri izmeni knjige.",
                  errorRes.error.message
                );
              }
            );
        } else {
          return this.bookService
            .editBook(
              this.bookToEdit.id,
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
              this.bookToEdit.imageUrl,
              piecesAvailable
            )
            .subscribe(
              () => {
                loadingElem.dismiss();
                this.router.navigate(["admin-panel", "tabs", "books"]);
                this.showToastMessage("Uspešno izmenjena knjiga.");
              },
              (errorRes) => {
                loadingElem.dismiss();
                // this.router.navigate(["admin-panel", "tabs", "books"]);
                this.showErrorMessage(
                  "Greška pri izmeni knjige.",
                  errorRes.error.message
                );
              }
            );
        }
      });
  }

  initializeForm() {
    this.bookForm.get("isbn").setValue(this.bookToEdit.isbn);
    this.bookForm.get("title").setValue(this.bookToEdit.title);
    this.bookForm.get("price").setValue(this.bookToEdit.price);
    this.bookForm.get("numberOfPages").setValue(this.bookToEdit.numberOfPages);
    this.bookForm.get("binding").setValue(this.bookToEdit.binding);
    this.bookForm
      .get("publicationYear")
      .setValue(this.bookToEdit.publicationYear);
    this.bookForm.get("description").setValue(this.bookToEdit.description);
    this.bookForm.get("publisherId").setValue(this.bookToEdit.publisher.id);
    this.bookForm.get("inStock").setValue(this.bookToEdit.inStock);
    this.bookForm
      .get("piecesAvailable")
      .setValue(this.bookToEdit.piecesAvailable);
    const auhtorsIds = this.bookToEdit.authors.map((author) => author.id);
    const genresIds = this.bookToEdit.genres.map((genre) => genre.id);
    this.bookForm.get("authorsIds").setValue(auhtorsIds);
    this.bookForm.get("genresIds").setValue(genresIds);
  }

  private showErrorMessage(headerMsg: string, errorMsg: string) {
    this.alertCtrl
      .create({
        header: headerMsg,
        message: errorMsg,
        buttons: [
          {
            text: "OK",
            role: "cancel",
          },
        ],
      })
      .then((alertEl) => {
        alertEl.present();
      });
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
