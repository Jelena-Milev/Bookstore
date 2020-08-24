import { Component, OnInit } from "@angular/core";
import { Author } from "./author.model";
import { AuthorsService } from "./authors.service";

@Component({
  selector: "app-authors",
  templateUrl: "./authors.page.html",
  styleUrls: ["./authors.page.scss"],
})
export class AuthorsPage implements OnInit {
  authors: Author[];
  isLoading: boolean;
  searchText: string = "";
  cp:number = 1;
  constructor(private authorsService: AuthorsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.authorsService.authors.subscribe((res) => {
      this.authors = res;
      this.isLoading = false;
    });
  }

  ionViewWillEnter() {
    this.authorsService.getAuthors().subscribe();
  }
}
