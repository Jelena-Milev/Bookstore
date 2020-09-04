import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from "rxjs";
import { tap, switchMap, take } from "rxjs/operators";
import { Publisher } from "./publisher.model";

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: "root",
})
export class PublishersService {
  private _publishers: BehaviorSubject<Publisher[]> = new BehaviorSubject([]);

  constructor(private http: HttpClient) {}

  get publishers() {
    return this._publishers.asObservable();
  }

  getPublishers(){
    // return this.http.get<Publisher[]>(`${environment.apiUrl}/books/publishers`).pipe(
    return this.http.get<Publisher[]>(`http://localhost:8081/publishers`).pipe(
      tap(res=>{
        this._publishers.next(res);
      })
    )
  }

  savePublisher(name:string, address:string, email: string, siteUrl: string){
    let newPublisher: Publisher;
    return this.http.post<Publisher>(`${environment.apiUrl}/books/publishers`, {
      name, address, email, siteUrl
    }).pipe(
      switchMap((publisher)=>{
        newPublisher = publisher;
        return this._publishers;
      }),
      take(1),
      tap(publishers=>{
        publishers.splice(0, 0, newPublisher);
        this._publishers.next(publishers);
      })
    )
  }

  updatePublisher(id:number, name:string, address:string, email: string, siteUrl: string){
    let newPublisher: Publisher;
    return this.http.put<Publisher>(`${environment.apiUrl}/books/publishers/${id}`, {
      name, address, email, siteUrl
    }).pipe(
      switchMap((publisher)=>{
        newPublisher = publisher;
        return this._publishers;
      }),
      take(1),
      tap(publishers=>{
        const indexOfChanged = publishers.findIndex(publisher => publisher.id === id);
        const updatedPublishers = [...publishers];
        updatedPublishers[indexOfChanged] = newPublisher;
        this._publishers.next(updatedPublishers);
      })
    )
  }
}
