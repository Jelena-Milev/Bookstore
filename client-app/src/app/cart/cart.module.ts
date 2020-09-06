import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartPageRoutingModule } from './cart-routing.module';

import { CartPage } from './cart.page';
import { NgxPaginationModule } from 'ngx-pagination';
import { CartHeaderComponent } from './cart-header/cart-header.component';
import { PaymentDialogComponent } from './payment-dialog/payment-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxPaginationModule,
    CartPageRoutingModule
  ],
  declarations: [CartPage, CartHeaderComponent, PaymentDialogComponent],
  entryComponents: [CartHeaderComponent, PaymentDialogComponent]
})
export class CartPageModule {}
