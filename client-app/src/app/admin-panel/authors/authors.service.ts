import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
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

}
