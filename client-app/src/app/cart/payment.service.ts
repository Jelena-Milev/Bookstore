import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { PaymentIntent } from './payment-intent.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http:HttpClient) { }

  public pay(paymentIntentDto: PaymentIntent):Observable<string>{
    return this.http.post<string>(`${environment.apiUrl}/book-orders/stripe/payment-intent`, paymentIntentDto)
  }

  public confirm(id: string):Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/book-orders/stripe/confirm/${id}`, {});
  }

  public cancel(id: string):Observable<string>{
    return this.http.post<string>(`${environment.apiUrl}/book-orders/stripe/cancel/${id}`, {});
  }
}
