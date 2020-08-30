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
    const storedData = localStorage.getItem('authData');
    const parsedData = JSON.parse(storedData) as {
      userId: string;
      role: string;
      token: string;
      tokenExpirationDate: string;
    };
    let token = "";
    if(parsedData){
      token = parsedData.token;
    }
    const modifiedRequest = req.clone({
      headers: req.headers
        .set("Authorization", `Bearer ${token}`)
    });
    return next.handle(modifiedRequest);
  }
}
