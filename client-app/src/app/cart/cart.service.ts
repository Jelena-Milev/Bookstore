import { Injectable } from "@angular/core";
import { Book } from "../admin-panel/books/book.model";
import { BehaviorSubject, of } from "rxjs";
import { CartItem } from "./cart-item.model";
import { tap, switchMap, take } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private _cartItems: BehaviorSubject<CartItem[]> = new BehaviorSubject([]);
  private _cartItemsCount = new BehaviorSubject<number>(0); 
  constructor() {}

  get cartItems() {
    return this._cartItems.asObservable();
  }

  get cartItemsCount(){
    return this._cartItemsCount.asObservable();
  }

  resetCartItemsCount(){
    this._cartItemsCount.next(0);
  }

  getItems() {
    const cartItems: CartItem[] = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      let key = sessionStorage.key(i);
      let value = sessionStorage.getItem(key);
      const cartItemObject = JSON.parse(value);
      cartItems.push(this.parseCartItem(cartItemObject));
    }
    this._cartItems.next(cartItems);
    this._cartItemsCount.next(this.calculateCartItemsPieces(cartItems));

    return of(cartItems);
  }

  addItem(book: Book, quantity: number) {
    const itemKey = JSON.stringify(book.id);
    const existingCartItem = JSON.parse(sessionStorage.getItem(itemKey));
    if (existingCartItem !== null) {
      const currentQuantity: number = parseInt(existingCartItem.quantity);
      existingCartItem.quantity = currentQuantity + quantity;
      sessionStorage.setItem(itemKey, JSON.stringify(existingCartItem));
      return this.getItems().pipe(
        take(1),
        tap((items) => {
          const index = items.findIndex((ci) => ci.book.id === book.id);
          const updatedCartItems = [...items];
          updatedCartItems[index].quantity = currentQuantity + quantity;
          this._cartItems.next(updatedCartItems);
          this._cartItemsCount.next(this.calculateCartItemsPieces(updatedCartItems));
        })
      );
    } else {
      const newCartItem = new CartItem(book, quantity);
      sessionStorage.setItem(itemKey, JSON.stringify(newCartItem));
      return this.getItems().pipe(
        take(1),
        tap((items) => {
          this._cartItems.next(items.concat(newCartItem));
          this._cartItemsCount.next(this.calculateCartItemsPieces(items));
        })
      );
    }
  }

  updateItem(book: Book, newQuantity: number) {
    const newCartItem = new CartItem(book, newQuantity);
    sessionStorage.setItem(
      JSON.stringify(book.id),
      JSON.stringify(newCartItem)
    );
    return this.getItems().pipe(
      take(1),
      tap((items) => {
        const index = items.findIndex((ci) => ci.book.id === book.id);
        const updatedCartItems = [...items];
        updatedCartItems[index].quantity = newQuantity;
        this._cartItems.next(updatedCartItems);
        this._cartItemsCount.next(this.calculateCartItemsPieces(updatedCartItems));
      })
    );
  }

  deleteItem(book: Book) {
    sessionStorage.removeItem(JSON.stringify(book.id));
    return this.getItems().pipe(
      take(1),
      tap((items) => {
        const updatedCartItems: CartItem[] = items.filter(
          (ci) => ci.book.id != book.id
        );
        this._cartItems.next(updatedCartItems);
        this._cartItemsCount.next(this.calculateCartItemsPieces(updatedCartItems));
      })
    );
  }

  private calculateCartItemsPieces(cartItems: CartItem[]){
    let sum = 0;
    cartItems.forEach(item => sum += item.quantity);
    return sum;
  }

  parseCartItem(item) {
    const id: number = item.book.id;
    const title: string = item.book.title;
    const description: string = item.book.description;
    const isbn: string = item.book.isbn;
    const price: number = item.book.price;
    const binding: string = item.book.binding;
    const inStock: boolean = item.book.inStock;
    const numberOfPages: number = item.book.numberOfPages;
    const publicationYear: number = item.book.publicationYear;
    const authorsNames: string[] = item.book.authorsNames;
    const genresNames: string[] = item.book.genresNames;
    const imageUrl: string = item.book.imageUrl;
    const book: Book = new Book(
      id,
      isbn,
      title,
      price,
      numberOfPages,
      binding,
      publicationYear,
      description,
      imageUrl,
      inStock,
      null,
      null,
      null,
      authorsNames,
      genresNames
    );
    const quantity: number = item.quantity;
    return new CartItem(book, quantity);
  }
}
