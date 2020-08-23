import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";
import { Publisher } from "./publisher.model";

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: "root",
})
export class PublishersService {
  private _publishers: BehaviorSubject<Publisher[]> = new BehaviorSubject<
    Publisher[]
  >([]);

  constructor(private http: HttpClient) {}

  get publishers() {
    return this._publishers.asObservable();
  }

  getPublishers(){
    return this.http.get<Publisher[]>(`${environment.apiUrl}/books/publishers`).pipe(
      tap(res=>{
        this._publishers.next(res);
        console.log(this._publishers)
      })
    )
  }
}
