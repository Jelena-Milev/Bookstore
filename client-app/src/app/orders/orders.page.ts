import { Component, OnInit } from '@angular/core';
import { Order } from './order.model';
import { OrdersService } from './orders.service';
import { ModalController } from '@ionic/angular';
import { OrderDetailComponent } from './order-detail/order-detail.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  isLoading = false;
  orders: Order[] = [];
  itemsPerPage = 7;
  cp = 1;
  constructor(private ordersService:OrdersService, private modalCtrl:ModalController) { }

  ngOnInit() {
    this.ordersService.orders.subscribe(orders=>{
      this.orders = orders;
    })
  }

  ionViewWillEnter(){
    this.ordersService.getOrdersByUserId().subscribe();
  }

  onViewOrderDetails(order: Order){
    this.modalCtrl.create({
      component: OrderDetailComponent,
      componentProps: {
        order: order
      }
    }).then(modalEl => {
      modalEl.present();
    })
  }
}
