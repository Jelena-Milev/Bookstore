import { Component, OnInit } from '@angular/core';
import { Genre } from './genre.model';
import { GenresService } from './genres.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.page.html',
  styleUrls: ['./genres.page.scss'],
})
export class GenresPage implements OnInit {

  genres: Genre[];
  isLoading: boolean;
  searchText: string = "";
  cp: number = 1;
  itemsPerPage: number = 10;

  genreForm:FormGroup = new FormGroup({
    name:new FormControl('', Validators.required)
  })

  constructor(private genresService:GenresService) { }

  ngOnInit() {
    this.isLoading = true;
    this.genresService.genres.subscribe((res) => {
      this.genres = res;
      this.isLoading = false;
    });
  }

  ionViewWillEnter() {
    this.genresService.getGenres().subscribe();
  }

  onSaveGenre(){
    
  }
}
