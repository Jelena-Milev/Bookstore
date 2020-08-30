import { Component, OnInit } from "@angular/core";
import { Author } from "./author.model";
import { AuthorsService } from "./authors.service";
import { ModalController, LoadingController } from "@ionic/angular";
import { AuthorFormComponent } from "./author-form/author-form.component";
import { ImageService } from '../image.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: "app-authors",
  templateUrl: "./authors.page.html",
  styleUrls: ["./authors.page.scss"],
})
export class AuthorsPage implements OnInit {
  authors: Author[];
  isLoading: boolean;
  searchText: string = "";
  cp: number = 1;
  itemsPerPage:number = 3;
  
  constructor(
    private authorsService: AuthorsService,
    private imageService: ImageService,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.authorsService.authors.subscribe((res) => {
      this.authors = res;
      this.isLoading = false;
    });
  }

  ionViewWillEnter() {
    this.authorsService.getAuthors().subscribe();
  }

  onAddAuthor() {
    this.modalCtrl
      .create({
        component: AuthorFormComponent,
      })
      .then((modal) => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then((resData) => {
        if (resData.role === "confirm") {
          this.loadingCtrl
            .create({ message: "Cuvanje autora..." })
            .then((loadingElem) => {
              loadingElem.present();
              this.imageService.uploadImage(resData.data.authorData.image).pipe(
                switchMap(uploadRes=>{
                  return this.authorsService
                  .saveAuthor(
                    resData.data.authorData.firstName,
                    resData.data.authorData.lastName,
                    resData.data.authorData.biography,
                    uploadRes.imageUrl
                  )
                })
              ).subscribe(() => {
                  loadingElem.dismiss();
                },
                (error)=>{
                  loadingElem.dismiss();
                });
            });
        }
      });
  }
}
