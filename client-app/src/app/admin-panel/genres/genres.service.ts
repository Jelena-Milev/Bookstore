import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Genre } from './genre.model';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GenresService {
  private _genres: BehaviorSubject<Genre[]> = new BehaviorSubject([]);

  constructor(private http:HttpClient) { }

  get genres(){
    return this._genres.asObservable();
  }

  getGenres(){
    return this.http.get<Genre[]>(`${environment.apiUrl}/books/genres`).pipe(
      tap(res=>{
        this._genres.next(res);
      })
    )
  }
}
