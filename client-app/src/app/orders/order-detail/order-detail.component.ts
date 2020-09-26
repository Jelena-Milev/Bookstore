import { Component, OnInit, Input } from "@angular/core";
import { Order } from "../order.model";
import { ModalController } from "@ionic/angular";
import { Router } from '@angular/router';

@Component({
  selector: "app-order-detail",
  templateUrl: "./order-detail.component.html",
  styleUrls: ["./order-detail.component.scss"],
})
export class OrderDetailComponent implements OnInit {
  @Input() order: Order;
  itemsPerPage = 4;
  cp = 1;
  constructor(private modalCtrl: ModalController, private router:Router) {}

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss();
  }

  onBookClicked(bookId:number){
    this.modalCtrl.dismiss();
    this.router.navigate(['/', 'home', 'books', bookId]);
  }
}
