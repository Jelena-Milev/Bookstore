import { Pipe, PipeTransform } from '@angular/core';
import { Publisher } from './publisher.model';

@Pipe({
  name: 'searchPublishers'
})
export class SearchPipe implements PipeTransform {

  transform(items: Publisher[], searchText: string): Publisher[] {
    if (!items) {
      return [];
    }
    if (!searchText || searchText === '') {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(it => {
      return it.name.toLocaleLowerCase().startsWith(searchText);
    });
  }

}
