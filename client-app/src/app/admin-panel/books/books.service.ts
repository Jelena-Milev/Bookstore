import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Book } from "./book.model";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { tap, map, switchMap, take } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class BooksService {
  private _books: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);
  private _booksInStock: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);
  private _bestsellers: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);

  constructor(private http: HttpClient) {}

  get books() {
    return this._books.asObservable();
  }
  get booksInStock() {
    return this._booksInStock.asObservable();
  }
  get bestsellers() {
    return this._bestsellers.asObservable();
  }

  getBooks() {
    return this.http.get<Book[]>(`${environment.apiUrl}/books`).pipe(
      map((res) => {
        res.forEach((book) => {
          this.mapGenresAndAuthorsNames(book);
        });
        return res;
      }),
      tap((books) => {
        this._books.next(books);
      })
    );
  }

  getBooksInStock() {
    return this.http.get<Book[]>(`${environment.apiUrl}/books/in-stock`).pipe(
      map((res) => {
        res.forEach((book) => {
          this.mapGenresAndAuthorsNames(book);
        });
        return res;
      }),
      tap((books) => {
        this._booksInStock.next(books);
      })
    );
  }

  getBookById(bookId: string){
    return this.http.get<Book>(`${environment.apiUrl}/books/${bookId}`);
  }

  getBestsellers(){
    return this.http.get<Book[]>(`${environment.apiUrl}/books/best-sellers?number=10`).pipe(
      map((res) => {
        res.forEach((book) => {
          this.mapGenresAndAuthorsNames(book);
        });
        return res;
      }),
      tap((books) => {
        this._bestsellers.next(books);
      }));
  }

  getBooksByGenre(genreId:number){
    return this.http.get<Book[]>(`${environment.apiUrl}/books/filter?genreId=${genreId}`).pipe(
      map((res) => {
        console.log(res);
        res.forEach((book) => {
          this.mapGenresAndAuthorsNames(book);
        });
        return res;
      }),
      tap((books) => {
        this._booksInStock.next(books);
      }));
  }

  saveBook(
    isbn: string,
    title: string,
    price: number,
    numberOfPages: number,
    binding: string,
    publicationYear: number,
    description: string,
    publisherId: number,
    authorsIds: number[],
    genresIds: number,
    inStock: boolean,
    imageUrl: string,
    piecesAvailable: number
  ) {
    let newBook: Book;
    return this.http.post<Book>(`${environment.apiUrl}/books`, {
      isbn,
      title,
      price,
      numberOfPages,
      binding,
      publicationYear,
      description,
      publisherId,
      authorsIds,
      genresIds,
      inStock,
      imageUrl,
      piecesAvailable
    }).pipe(
      switchMap((savedBook)=>{
        newBook = savedBook;
        return this._books;
      }),
      take(1),
      tap((books)=>{
        this.mapGenresAndAuthorsNames(newBook);
        books.splice(0, 0, newBook);
        this._books.next(books);
      })
    );
  }

  editBook(
    id: number,
    isbn: string,
    title: string,
    price: number,
    numberOfPages: number,
    binding: string,
    publicationYear: number,
    description: string,
    publisherId: number,
    authorsIds: number[],
    genresIds: number,
    inStock: boolean,
    imageUrl: string,
    piecesAvailable: number
  ) {
    let newBook: Book;
    return this.http.put<Book>(`${environment.apiUrl}/books/${id}`, {
      isbn,
      title,
      price,
      numberOfPages,
      binding,
      publicationYear,
      description,
      publisherId,
      authorsIds,
      genresIds,
      inStock,
      imageUrl,
      piecesAvailable
    }).pipe(
      switchMap((savedBook)=>{
        newBook = savedBook;
        return this._books;
      }),
      take(1),
      tap((books)=>{
        this.mapGenresAndAuthorsNames(newBook);
        books.splice(0, 0, newBook);
        this._books.next(books);
      })
    );
  }

  deleteBook(id:number){
    let deletedBook: Book;
    return this.http.delete<Book>(`${environment.apiUrl}/books/${id}`).pipe(
      switchMap((res)=>{
        deletedBook = res;
        return this._books;
      }),
      take(1),
      tap(books=>{
        this.mapGenresAndAuthorsNames(deletedBook);
        const deletedBookIndex = books.findIndex(book => book.id === deletedBook.id);
        const changedBooks: Book[] = [...books];
        changedBooks[deletedBookIndex] = deletedBook;
        this._books.next(changedBooks);
      })
    )
  }

  mapGenresAndAuthorsNames(book:Book){
    book.authorsNames = book.authors.map(
      (author) => " " + author.firstName + " " + author.lastName
    );
    book.genresNames = book.genres.map((genre) => " " + genre.name);
  }
}
