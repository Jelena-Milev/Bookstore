import { Book } from "../admin-panel/books/book.model";

export class CartItem {
  constructor(public book: Book, public quantity: number) {}
}
