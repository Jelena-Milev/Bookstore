import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { BooksPageRoutingModule } from "./books-routing.module";

import { BooksPage } from "./books.page";
import { SearchPipe } from "./search.pipe";
import { NgxPaginationModule } from "ngx-pagination";
import { BookDescComponent } from "./book-desc/book-desc.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NgxPaginationModule,
    BooksPageRoutingModule,
  ],
  declarations: [BooksPage, SearchPipe, BookDescComponent],
  entryComponents: [BookDescComponent],
})
export class BooksPageModule {}
