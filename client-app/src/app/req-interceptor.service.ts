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
        .set("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iXSwiaWF0IjoxNTk4NDU3Mzk0LCJleHAiOjE1OTg1NDM3OTR9.idwd1hrcFKOxTMlBfM02-TmMeF04QRqOG-Y4z1URYo_TL_Is2yS0JAcCv4VbqMQ98kgjOnCDduzYK--SEU0C-g")
    });
    return next.handle(modifiedRequest);
  }
}
