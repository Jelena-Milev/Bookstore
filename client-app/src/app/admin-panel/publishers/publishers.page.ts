import { Component, OnInit } from "@angular/core";
import { Publisher } from "./publisher.model";
import { PublishersService } from "./publishers.service";
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
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
    private alertCtrl: AlertController
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

  onAddPublisher() {
    this.modalCtrl
      .create({
        component: PublisherFormComponent,
        componentProps:{
          title: "Novi izdavac"
        }
      })
      .then((modal) => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then((resData) => {
        if (resData.role === "confirm") {
          this.loadingCtrl
            .create({ message: "Cuvanje izdavaca..." })
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
                },
                (errorRes)=>{
                  loadingElem.dismiss();
                  this.showErrorMessage(errorRes.error.message);
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
          title: "Izmena izdavaca",
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
            .create({ message: "Cuvanje izdavaca..." })
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
                },
                (errorRes)=>{
                  loadingElem.dismiss();
                  this.showErrorMessage(errorRes.error.message);
                });
            });
        }
      });
  }

  private showErrorMessage(errorMsg: string){
    this.alertCtrl.create({
      header: 'Greska pri unosu izdavaca',
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
}
