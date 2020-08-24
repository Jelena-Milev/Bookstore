import { Pipe, PipeTransform } from '@angular/core';
import { Author } from './author.model';

@Pipe({
  name: 'searchAuthors'
})
export class SearchPipe implements PipeTransform {

  transform(items: Author[], searchText: string): Author[] {
    if (!items) {
      return [];
    }
    if (!searchText || searchText === '') {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(it => {
      return it.firstName.toLocaleLowerCase().startsWith(searchText) || it.lastName.toLocaleLowerCase().startsWith(searchText);
    });
  }

}
