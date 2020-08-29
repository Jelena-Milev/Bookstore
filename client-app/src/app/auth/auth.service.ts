import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { BehaviorSubject, from, of } from "rxjs";
import { tap, switchMap, map } from "rxjs/operators";
import { User } from "./user.model";

interface AuthResponseData {
  expiresIn: number;
  authToken: string;
  userId: string;
  role: Authority[];
}

interface Authority {
  authority: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _role: BehaviorSubject<string> = new BehaviorSubject("");
  private _user = new BehaviorSubject<User>(null);
  constructor(private http: HttpClient) {}

  get userIsAuthenticated() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return !!user.token;
        } else {
          return false;
        }
      })
    );
  }

  get role() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return user.role;
        } else {
          return null;
        }
      })
    );
  }

  get userId() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return user.userId;
        } else {
          return null;
        }
      })
    );
  }

  get token() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return user.token;
        } else {
          return null;
        }
      })
    );
  }

  autoLogin() {
    return of(localStorage.getItem("authData")).pipe(
      map((storedData) => {
        if (!storedData) {
          return null;
        }
        const parsedData = JSON.parse(storedData) as {
          userId: string;
          role: string;
          token: string;
          tokenExpirationDate: string;
        };
        const expirationTime = new Date(parsedData.tokenExpirationDate);
        if(expirationTime <= new Date()){
          return null;
        }
        const user = new User(parsedData.userId, parsedData.role, parsedData.token, expirationTime);
        return user;
      }),
      tap(user=>{
        if(user){
          this._user.next(user);
        }
      }), 
      map(user=>{
        return !!user;
      })
    );
  }

  login(username: string, password: string) {
    return this.http
      .post<AuthResponseData>(`${environment.apiUrl}/auth/login`, {
        username,
        password,
      })
      .pipe(
        tap((userData) => {
          const expirationTime = new Date(
            new Date().getTime() + +userData.expiresIn * 1000
          );
          const user = new User(
            userData.userId,
            userData.role[0].authority.split("_")[1],
            userData.authToken,
            expirationTime
          );
          this._user.next(user);
          this.storeUserData(
            userData.userId,
            userData.role[0].authority.split("_")[1],
            userData.authToken,
            expirationTime.toISOString()
          );
        })
      );
  }

  private storeUserData(
    userId: string,
    role: string,
    token: string,
    tokenExpirationDate: string
  ) {
    const data = JSON.stringify({
      userId: userId,
      token: token,
      role: role,
      tokenExpirationDate: tokenExpirationDate,
    });
    localStorage.setItem("authData", data);
  }
}
