import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CartItem } from "../cart/cart-item.model";
import { AuthService } from "../auth/auth.service";
import { environment } from "src/environments/environment";
import { switchMap, tap, take, map } from "rxjs/operators";
import { Order } from "./order.model";
import { BehaviorSubject } from "rxjs";

export class OrderItem {
  constructor(public bookId: number, public quantity: number, public bookTitle:string) {}
}

@Injectable({
  providedIn: "root",
})
export class OrdersService {
  private _orders = new BehaviorSubject<Order[]>([]);

  constructor(private http: HttpClient, private authService: AuthService) {}

  get orders() {
    return this._orders.asObservable();
  }

  getOrdersByUserId(){
    return this.authService.userId.pipe(
      take(1),
      switchMap((userId)=>{
        return this.http.get<Order[]>(`${environment.apiUrl}/book-orders?userId=${userId}`)
      }),
      tap(orders=>{
        this._orders.next(orders);
        console.log(orders);
      })
    )
  }

  checkAvailability(cartItems: CartItem[]){
    const items = cartItems.map((item) => {
      return new OrderItem(item.book.id, item.quantity, item.book.title);
    });
    return this.authService.userId.pipe(
      take(1),
      switchMap((userId) => {
        // if (!userId) return;
        return this.http.post<Order>(`${environment.apiUrl}/book-orders/items/availability`, items);
      })
    );
  }

  createOrder(cartItems: CartItem[], orderIdentifier:string, paymentReceiptUrl:string) {
    const items = cartItems.map((item) => {
      return new OrderItem(item.book.id, item.quantity, item.book.title);
    });
    let newOrder: Order;
    return this.authService.userId.pipe(
      take(1),
      switchMap((userId) => {
        // if (!userId) return;
        return this.http.post<Order>(`${environment.apiUrl}/book-orders`, {
          userId,
          orderIdentifier,
          paymentReceiptUrl,
          items,
        });
      }),
      switchMap((order) => {
        newOrder = order;
        return this._orders;
      }),
      take(1),
      tap((orders) => {
        this._orders.next(orders.concat(newOrder));
      })
    );
  }
}
