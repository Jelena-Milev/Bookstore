import { Pipe, PipeTransform } from '@angular/core';
import { Book } from './book.model';

@Pipe({
  name: 'searchBooks'
})
export class SearchPipe implements PipeTransform {

  transform(items: Book[], searchText: string): Book[] {
    if (!items) {
      return [];
    }
    if (!searchText || searchText === '') {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(it => {
      return it.title.toLocaleLowerCase().indexOf(searchText) !== -1;
    });
  }
}
