import { Component, OnInit } from "@angular/core";
import { Publisher } from "./publisher.model";
import { PublishersService } from "./publishers.service";
import { ModalController, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { PublisherFormComponent } from './publisher-form/publisher-form.component';

@Component({
  selector: "app-publishers",
  templateUrl: "./publishers.page.html",
  styleUrls: ["./publishers.page.scss"],
})
export class PublishersPage implements OnInit {
  publishers: Publisher[];
  isLoading: boolean;
  currentPage: number = 1;
  itemsPerPage: number = 4;
  seachText: string = "";

  constructor(
    private publishersService: PublishersService,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController, 
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.publishersService.publishers.subscribe((res) => {
      this.publishers = res;
      this.isLoading = false;
    });
  }

  ionViewWillEnter() {
    this.publishersService.getPublishers().subscribe();
  }

  onSearchTextTyped(){
    this.currentPage = 1;
  }

  onAddPublisher() {
    this.modalCtrl
      .create({
        component: PublisherFormComponent,
        componentProps:{
          title: "Novi izdavač"
        }
      })
      .then((modal) => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then((resData) => {
        if (resData.role === "confirm") {
          this.loadingCtrl
            .create({ message: "Čuvanje izdavača..." })
            .then((loadingElem) => {
              loadingElem.present();
              this.publishersService
                .savePublisher(
                  resData.data.publisherData.name,
                  resData.data.publisherData.address,
                  resData.data.publisherData.mail,
                  resData.data.publisherData.siteUrl
                )
                .subscribe(() => {
                  loadingElem.dismiss();
                  this.showToastMessage('Uspešno sačuvan novi izdavač');
                },
                (errorRes)=>{
                  loadingElem.dismiss();
                  this.showErrorMessage('Greška pri dodavanju izdavača', errorRes.error.message);
                });
            });
        }
      });
  }

  onEditPublisher(publisher: Publisher) {
    this.modalCtrl
      .create({
        component: PublisherFormComponent,
        componentProps:{
          title: "Izmena izdavača",
          publisher: publisher
        }
      })
      .then((modal) => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then((resData) => {
        if (resData.role === "confirm") {
          this.loadingCtrl
            .create({ message: "Čuvanje izdavača..." })
            .then((loadingElem) => {
              loadingElem.present();
              this.publishersService
                .updatePublisher(
                  publisher.id,
                  resData.data.publisherData.name,
                  resData.data.publisherData.address,
                  resData.data.publisherData.mail,
                  resData.data.publisherData.siteUrl
                )
                .subscribe(() => {
                  loadingElem.dismiss();
                  this.showToastMessage('Izdavač je uspešno izmenjen.');
                },
                (errorRes)=>{
                  loadingElem.dismiss();
                  this.showErrorMessage('Greška pri izmeni izdavača', errorRes.error.message);
                });
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
