import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthorsPageRoutingModule } from './authors-routing.module';

import { AuthorsPage } from './authors.page';
import { SearchPipe } from './search.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthorFormComponent } from './author-form/author-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NgxPaginationModule,
    AuthorsPageRoutingModule
  ],
  declarations: [AuthorsPage, SearchPipe, AuthorFormComponent],
  entryComponents: [AuthorFormComponent]
})
export class AuthorsPageModule {}
