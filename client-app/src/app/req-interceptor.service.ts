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
        .set("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iXSwiaWF0IjoxNTk4NTIwMDYwLCJleHAiOjE1OTg2MDY0NjB9.F1Hl0rWnPDfXdxZWs_cxxGr67EKVnuSGzygrEngHkPHVBX4sfUxi8C3uYUATq2J_06HIBWqRWNkVZOnEg7Ucug")
    });
    return next.handle(modifiedRequest);
  }
}
