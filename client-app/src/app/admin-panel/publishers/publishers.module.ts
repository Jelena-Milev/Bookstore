import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublishersPageRoutingModule } from './publishers-routing.module';

import { PublishersPage } from './publishers.page';

import { NgxPaginationModule } from "ngx-pagination";
import { SearchPipe } from './search.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublishersPageRoutingModule,
    NgxPaginationModule
  ],
  declarations: [PublishersPage, SearchPipe]
})
export class PublishersPageModule {}