import { Component, OnInit } from "@angular/core";
import { Genre } from "./genre.model";
import { GenresService } from "./genres.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { IonInput, LoadingController } from "@ionic/angular";

@Component({
  selector: "app-genres",
  templateUrl: "./genres.page.html",
  styleUrls: ["./genres.page.scss"],
})
export class GenresPage implements OnInit {
  genres: Genre[];
  isLoading: boolean;
  searchText: string = "";
  cp: number = 1;
  itemsPerPage: number = 6;

  genreForm: FormGroup = new FormGroup({
    name: new FormControl("", Validators.required),
  });

  constructor(
    private genresService: GenresService,
    private loagindCtrl: LoadingController
  ) {}

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

  onSaveGenre() {
    this.loagindCtrl.create({message: 'Cuvanje zanra...'}).then((loadingElem)=>{
      loadingElem.present();
      this.genresService.saveGenre(this.genreForm.get("name").value).subscribe(()=>{
        loadingElem.dismiss();
      });
    })    
  }
}
