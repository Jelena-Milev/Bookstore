import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenresPageRoutingModule } from './genres-routing.module';

import { GenresPage } from './genres.page';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchGenresPipe } from './search-genres.pipe';
import { GenreFormComponent } from './genre-form/genre-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NgxPaginationModule,
    GenresPageRoutingModule
  ],
  declarations: [GenresPage, SearchGenresPipe, GenreFormComponent],
  entryComponents: [GenreFormComponent]
})
export class GenresPageModule {}
