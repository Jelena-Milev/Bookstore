import { Component, OnInit } from "@angular/core";
import { Author } from "./author.model";
import { AuthorsService } from "./authors.service";
import { ModalController, LoadingController, AlertController, ToastController } from "@ionic/angular";
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
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
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
        componentProps:{
          title: "Novi autor"
         }
      })
      .then((modal) => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then((resData) => {
        if (resData.role === "confirm") {
          const imageToUpload = resData.data.authorData.image; 
          this.loadingCtrl
            .create({ message: "Cuvanje autora..." })
            .then((loadingElem) => {
              loadingElem.present();
              if(imageToUpload !== null && imageToUpload !== undefined){
                this.imageService.uploadImage(imageToUpload).pipe(
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
                    this.showToastMessage('Uspesno sacuvan novi autor');
                  },
                  (errorRes)=>{
                    loadingElem.dismiss();
                    this.showErrorMessage('Greska pri dodavanju novog autora', errorRes.error.message);
                  });
              }else{
                return this.authorsService
                    .saveAuthor(
                      resData.data.authorData.firstName,
                      resData.data.authorData.lastName,
                      resData.data.authorData.biography,
                      ""
                    ).subscribe(() => {
                    loadingElem.dismiss();
                    this.showToastMessage('Uspesno sacuvan novi autor');
                  },
                  (errorRes)=>{
                    loadingElem.dismiss();
                    this.showErrorMessage('Greska pri dodavanju novog autora', errorRes.error.message);
                  });
              }
            });
        }
      });
  }

  onEditAuthor(author: Author) {
    this.modalCtrl
      .create({
        component: AuthorFormComponent,
        componentProps:{
          title: 'Izmena autora',
          author: author
        }
      })
      .then((modal) => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then((resData) => {
        if (resData.role === "confirm") {
          const imageToUpload = resData.data.authorData.image; 
          this.loadingCtrl
            .create({ message: "Cuvanje autora..." })
            .then((loadingElem) => {
              loadingElem.present();
              if(imageToUpload !== null && imageToUpload !== undefined){
                this.imageService.uploadImage(imageToUpload).pipe(
                  switchMap(uploadRes=>{
                    return this.authorsService
                    .updateAuthor(
                      author.id,
                      resData.data.authorData.firstName,
                      resData.data.authorData.lastName,
                      resData.data.authorData.biography,
                      uploadRes.imageUrl
                    )
                  })
                ).subscribe(() => {
                    loadingElem.dismiss();
                    this.showToastMessage('Autor je uspesno izmenjen');
                  },
                  (errorRes)=>{
                    loadingElem.dismiss();
                    this.showErrorMessage('Greska pri izmeni autora', errorRes.error.message);
                  });
              }else{
                return this.authorsService
                    .updateAuthor(
                      author.id,
                      resData.data.authorData.firstName,
                      resData.data.authorData.lastName,
                      resData.data.authorData.biography,
                      author.imageUrl
                    ).subscribe(() => {
                    loadingElem.dismiss();
                    this.showToastMessage('Autor je uspesno izmenjen');
                  },
                  (errorRes)=>{
                    loadingElem.dismiss();
                    this.showErrorMessage('Greska pri izmeni autora', errorRes.error.message);
                  });
              }
            });
        }
      });
  }

  private showErrorMessage(headerMsg:string, errorMsg: string){
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
