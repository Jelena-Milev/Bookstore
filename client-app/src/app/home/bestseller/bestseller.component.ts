import { Component, OnInit, Input } from "@angular/core";
import { Book } from "src/app/admin-panel/books/book.model";

@Component({
  selector: "app-bestseller",
  templateUrl: "./bestseller.component.html",
  styleUrls: ["./bestseller.component.scss"],
})
export class BestsellerComponent implements OnInit {
  @Input() bestseller: Book;
  constructor() {}

  ngOnInit() {}
}
