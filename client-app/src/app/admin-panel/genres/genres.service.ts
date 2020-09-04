import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { Genre } from "./genre.model";
import { environment } from "src/environments/environment";
import { tap, switchMap, take } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class GenresService {
  private _genres: BehaviorSubject<Genre[]> = new BehaviorSubject([]);

  constructor(private http: HttpClient) {}

  get genres() {
    return this._genres.asObservable();
  }

  getGenres() {
    return this.http.get<Genre[]>(`${environment.apiUrl}/books/genres`).pipe(
      tap((res) => {
        this._genres.next(res);
      })
    );
  }

  saveGenre(name: string) {
    let newGenre;
    return this.http
      .post<Genre>(`${environment.apiUrl}/books/genres`, { name })
      .pipe(
        switchMap((genre) => {
          newGenre = genre;
          return this._genres;
        }),
        take(1),
        tap((genres) => {
          genres.splice(0, 0, newGenre);
          this._genres.next(genres);
        })
      );
  }

  updateGenre(id:number, name:string){
    console.log(id)
    console.log(name)

    let newGenre;
    return this.http
      .put<Genre>(`${environment.apiUrl}/books/genres/${id}`, { name })
      .pipe(
        switchMap((genre) => {
          newGenre = genre;
          return this._genres;
        }),
        take(1),
        tap((genres) => {
          const indexOfChanged = genres.findIndex(genre => genre.id === id);
          const updatedGenres = [... genres];
          updatedGenres[indexOfChanged].name = name;
          this._genres.next(updatedGenres);
        })
      );
  }
}
