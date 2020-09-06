import { Component, OnInit } from "@angular/core";
import { Genre } from "./genre.model";
import { GenresService } from "./genres.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {
  IonInput,
  LoadingController,
  AlertController,
  ModalController,
  ToastController,
} from "@ionic/angular";
import { GenreFormComponent } from "./genre-form/genre-form.component";

@Component({
  selector: "app-genres",
  templateUrl: "./genres.page.html",
  styleUrls: ["./genres.page.scss"],
})
export class GenresPage implements OnInit {
  genres: Genre[];
  isLoading: boolean;
  searchText: string = "";
  cp: number = 1;
  itemsPerPage: number = 4;

  constructor(
    private genresService: GenresService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.genresService.genres.subscribe((res) => {
      this.genres = res;
      this.isLoading = false;
    });
  }

  ionViewWillEnter() {
    this.genresService.getGenres().subscribe();
  }

  onSearchTextTyped(){
    this.cp = 1;
  }

  onAddGenre() {
    this.modalCtrl
      .create({
        component: GenreFormComponent,
        componentProps:{
          title: 'Novi zanr'
        }
      })
      .then((modal) => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then((resData) => {
        if (resData.role === "confirm") {
          this.loadingCtrl
            .create({ message: "Cuvanje zanra..." })
            .then((loadingElem) => {
              loadingElem.present();
              this.genresService.saveGenre(resData.data.genre.name).subscribe(
                () => {
                  this.loadingCtrl.dismiss();
                  this.showToastMessage('Uspesno sacuvan novi zanr');
                },
                (errorRes) => {
                  loadingElem.dismiss();
                  this.showErrorMessage('Greska pri dodavanju novog zanra',errorRes.error.message);
                }
              );
            });
        }
      });
  }

  onEditGenre(genre: Genre) {
    this.modalCtrl
      .create({
        component: GenreFormComponent,
        componentProps:{
          title: 'Izmena zanra',
          genre: genre
        }
      })
      .then((modal) => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then((resData) => {
        if (resData.role === "confirm") {
          this.loadingCtrl
            .create({ message: "Cuvanje zanra..." })
            .then((loadingElem) => {
              loadingElem.present();
              this.genresService.updateGenre(genre.id, resData.data.genre.name).subscribe(
                () => {
                  this.loadingCtrl.dismiss();
                  this.showToastMessage('Zanr je uspesno izmenjen');
                },
                (errorRes) => {
                  loadingElem.dismiss();
                  this.showErrorMessage('Greska pri izmeni zanra', errorRes.error.message);
                }
              );
            });
        }
      });
  }

  private showErrorMessage(headerMsg:string, errorMsg: string) {
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
