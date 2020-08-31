import { Book } from '../admin-panel/books/book.model';

export class Order{
  constructor(
    public id: number,
    public orderIdentifier: string,
    public date: Date,
    public totalPrice: number,
    public userId: string,
    public userInfo: UserInfo,
    public items: OrderItem[]
  ){}
}


export class UserInfo{
  constructor(
    public firstName: string,
    public lastName: string,
    public streetNameAndNumber: string,
    public city: string,
    public zipCode: string,
    public phone: string,
  ){}
}

export class OrderItem{
  constructor(
    public book:Book,
    public quantity:number,
    public itemPrice:number
  ){}
}