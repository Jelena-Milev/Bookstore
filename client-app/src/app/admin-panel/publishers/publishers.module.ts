import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublishersPageRoutingModule } from './publishers-routing.module';

import { PublishersPage } from './publishers.page';

import { NgxPaginationModule } from "ngx-pagination";
import { SearchPipe } from './search.pipe';
import { PublisherFormComponent } from './publisher-form/publisher-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PublishersPageRoutingModule,
    NgxPaginationModule
  ],
  declarations: [PublishersPage, SearchPipe, PublisherFormComponent],
  entryComponents: [PublisherFormComponent]
})
export class PublishersPageModule {}
