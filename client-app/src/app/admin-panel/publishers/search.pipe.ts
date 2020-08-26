import { Pipe, PipeTransform } from "@angular/core";
import { Publisher } from "./publisher.model";

@Pipe({
  name: "searchPublishers",
})
export class SearchPipe implements PipeTransform {
  transform(items: Publisher[], searchText: string): Publisher[] {
    if (!items) {
      return [];
    }
    if (!searchText || searchText === "") {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter((it) => {
      const publNameWords = it.name.toLocaleLowerCase().split(" ");
      return ( publNameWords.findIndex((word) => word.startsWith(searchText)) !== -1 );
    });
  }
}
