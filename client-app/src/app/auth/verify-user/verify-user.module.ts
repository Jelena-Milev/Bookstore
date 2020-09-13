import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifyUserPageRoutingModule } from './verify-user-routing.module';

import { VerifyUserPage } from './verify-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    VerifyUserPageRoutingModule
  ],
  declarations: [VerifyUserPage]
})
export class VerifyUserPageModule {}
