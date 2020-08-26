import { Pipe, PipeTransform } from '@angular/core';
import { Genre } from './genre.model';

@Pipe({
  name: 'searchGenres'
})
export class SearchGenresPipe implements PipeTransform {

  transform(items: Genre[], searchText: string): Genre[] {
    if (!items) {
      return [];
    }
    if (!searchText || searchText === "") {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter((it) => {
      const genreWords = it.name.toLocaleLowerCase().split(" ");
      return ( genreWords.findIndex((word) => word.startsWith(searchText)) !== -1 );
    });
  }

}
