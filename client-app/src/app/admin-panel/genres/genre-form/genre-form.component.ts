import { Component, OnInit, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Genre } from "../genre.model";

@Component({
  selector: "app-genre-form",
  templateUrl: "./genre-form.component.html",
  styleUrls: ["./genre-form.component.scss"],
})
export class GenreFormComponent implements OnInit {
  @Input() title: string = "";
  @Input() genre: Genre;

  genreForm: FormGroup = new FormGroup({
    name: new FormControl("", Validators.required),
  });

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    this.genreForm.get("name").setValue(this.genre?.name);
  }

  onCancel() {
    this.modalCtrl.dismiss();
  }

  onSaveGenre() {
    if (!this.genreForm.valid) {
      return;
    }
    this.modalCtrl.dismiss(
      {
        genre: {
          name: this.genreForm.value["name"],
        },
      },
      "confirm"
    );
  }
}
