import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { BestsellerComponent } from './bestseller/bestseller.component';
import { BookItemComponent } from './book-item/book-item.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { HeaderComponent } from '../header/header.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    NgxPaginationModule
  ],
  declarations: [HomePage, BestsellerComponent, BookItemComponent, HeaderComponent],
  entryComponents: [BestsellerComponent, BookItemComponent, HeaderComponent]
})
export class HomePageModule {}
