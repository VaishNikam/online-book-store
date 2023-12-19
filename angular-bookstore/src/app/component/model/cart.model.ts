import { Book } from "./book.model";

export interface Cart{
    cartId : number;
    mrpPrice : number;
    quantity : number;
    user : any;
    book: Book
}