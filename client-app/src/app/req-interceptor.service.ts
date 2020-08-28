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
        .set("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iXSwiaWF0IjoxNTk4NjA5NDIxLCJleHAiOjE1OTg2OTU4MjF9.xVhnk1TCE5a8ZK_7_7Q_QCD8KekxnvhOWcYf3nnGeOvwdWO0cOLs67rPQNcLFu6E9G9SIIRcihmChVv_wj750w")
    });
    return next.handle(modifiedRequest);
  }
}
