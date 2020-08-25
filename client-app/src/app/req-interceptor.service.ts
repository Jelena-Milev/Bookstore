import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ReqInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const modifiedRequest = req.clone({
      headers: req.headers
        .set("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iXSwiaWF0IjoxNTk4MzQ1MzcwLCJleHAiOjE1OTg0MzE3NzB9.a9niY-qSWffUc4F60sidxCWCeEgjU6caonzjkrh3a0T1LswcTR5ui39L63-IA2tCBa7kRJn2udkAK6FVRDjcUw")
    });
    return next.handle(modifiedRequest);
  }
}
