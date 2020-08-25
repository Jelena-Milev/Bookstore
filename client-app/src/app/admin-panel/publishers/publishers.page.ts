import { Component, OnInit } from "@angular/core";
import { Publisher } from "./publisher.model";
import { PublishersService } from "./publishers.service";
import { ModalController, LoadingController } from '@ionic/angular';
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
  itemsPerPage: number = 7;
  seachText: string = "";

  constructor(
    private publishersService: PublishersService,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController
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
                (error)=>{
                });
            });
        }
      });
  }
}
