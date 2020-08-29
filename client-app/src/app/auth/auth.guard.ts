import { Injectable } from "@angular/core";
import {
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { AuthService } from "./auth.service";
import { take, switchMap, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {

    if(route.path === 'home'){
      this.authService.autoLogin().subscribe();
      return true;
    }
    return this.authService.roleMatch(route.data.role).pipe(
      tap((canLoad) => {
        if (!canLoad) {
          this.router.navigate(["/", "home"]);
        }
      })
    );
  }
}
