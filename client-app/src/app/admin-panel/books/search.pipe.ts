import { Pipe, PipeTransform } from "@angular/core";
import { Book } from "./book.model";

@Pipe({
  name: "searchBooks",
})
export class SearchPipe implements PipeTransform {
  transform(items: Book[], searchText: string): Book[] {
    if (!items) {
      return [];
    }
    if (!searchText || searchText === "") {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter((it) => {
      const titleWords = it.title.toLocaleLowerCase().split(" ");
      return titleWords.findIndex((word) => word.startsWith(searchText)) !== -1;
    });
  }
}
