import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersPageRoutingModule } from './orders-routing.module';

import { OrdersPage } from './orders.page';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrdersHeaderComponent } from './orders-header/orders-header.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdersPageRoutingModule,
    NgxPaginationModule
  ],
  declarations: [OrdersPage, OrdersHeaderComponent, OrderDetailComponent],
  entryComponents: [OrdersHeaderComponent, OrderDetailComponent]
})
export class OrdersPageModule {}
