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
        .set("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iXSwiaWF0IjoxNTk4NzEzMDk5LCJleHAiOjE1OTg3OTk0OTl9.FoBmybkFlpLfpAhwqBB0PacDJNwPbeUblF3QQ0qtPSojyAeKRxowY5ze1wbtOwsuxlagMj77Ji4FT1PLpgLmsw")
    });
    return next.handle(modifiedRequest);
  }
}
