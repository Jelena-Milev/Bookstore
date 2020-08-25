import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from './book.model';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private _books: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);

  constructor(private http:HttpClient) { }

  get books(){
    return this._books.asObservable();
  }

  getBooks(){
    return this.http.get<Book[]>(`${environment.apiUrl}/books`).pipe(
      map(res=>{
        res.forEach(book=>{
          book.authorsNames = book.authors.map(author=> " " + author.firstName+" "+author.lastName);
          book.genresNames = book.genres.map(genre => " " + genre.name);
        })
        return res;
      }),
      tap(books=>{
        this._books.next(books);
      })
    )
  }
}
