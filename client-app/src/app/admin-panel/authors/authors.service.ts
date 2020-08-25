import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap, switchMap, take } from 'rxjs/operators';
import { Author } from './author.model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  private _authors: BehaviorSubject<Author[]> = new BehaviorSubject<Author[]>([]);

  constructor(private http:HttpClient) { }

  get authors(){
    return this._authors.asObservable();
  }

  getAuthors(){
    return this.http.get<Author[]>(`${environment.apiUrl}/books/authors`).pipe(
      tap(res=>{
        this._authors.next(res);
      })
    )
  }

  saveAuthor(firstName:string, lastName:string, biography: string, imageUrl: string){
    let newAuthor: Author;
    return this.http.post<Author>(`${environment.apiUrl}/books/authors`, {
      firstName, lastName, biography, imageUrl
    }).pipe(
      switchMap((author)=>{
        newAuthor = author;
        return this._authors;
      }),
      take(1),
      tap(authors=>{
        // this._authors.next(authors.concat(newAuthor));
        authors.splice(0, 0, newAuthor);
        this._authors.next(authors);
      })
    )
  }
}
