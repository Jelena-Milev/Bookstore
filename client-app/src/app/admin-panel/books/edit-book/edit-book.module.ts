import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditBookPageRoutingModule } from './edit-book-routing.module';

import { EditBookPage } from './edit-book.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditBookPageRoutingModule
  ],
  declarations: [EditBookPage]
})
export class EditBookPageModule {}
