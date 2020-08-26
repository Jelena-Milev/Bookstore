import { Publisher } from '../publishers/publisher.model';
import { Author } from '../authors/author.model';
import { Genre } from '../genres/genre.model';

export class Book{
  constructor(
    public id: number,
    public isbn: string,
    public title: string,
    public price: number,
    public numberOfPages: number,
    public binding: string,
    public publicationYear: number,
    public description: string,
    public imageUrl:string,
    public inStock: boolean,
    public publisher: Publisher,
    public authors: Author[],
    public genres: Genre[],
    public authorsNames: string[],
    public genresNames: string[]
  ){ }
}