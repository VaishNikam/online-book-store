import { Component, OnInit } from '@angular/core';
import { Book } from '../../model/book.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, debounceTime, distinctUntilChanged, take } from 'rxjs';
import { BookstoreService } from 'src/app/bookstore.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})

export class UserHomeComponent implements OnInit {
  bookList: Array<Book> = [];
  quantity: number = 0;
  user: any = {};
  getCategoryList: any[] = [];
  category: any = 100;
  allBookList : Array<Book>= [];
  offset: number = 0;
  pageSize: number = 8; // How many item you want to display in your page.
  totalbook: number = 1;
  searchType: string = "bycategory";
  searchKeyword: string = "";
  userInputUpdate = new Subject<string>();
  
  userName: string = '';
  constructor(
    private bservice: BookstoreService,
    private router: Router,
    private snakcbar: MatSnackBar
  ) 
  {
   this.bservice.isUserLoginPresent();
    this.getBookList(true);
    this.getUserDetail();
    
    if (this.bservice.getUserName() !== null) {
      this.userName = this.bservice.getUserName();
    }
  }
  


  ngOnInit(): void {
    this.getCategoryList = this.bservice.getCategoryList();
    this.userInputUpdate.pipe(
      debounceTime(400),
      distinctUntilChanged())
      .subscribe(value => {
        if (value.length > 0) {
          this.bservice.searchBookByName(this.searchKeyword, this.offset - 1 < 0 ? 0 : this.offset - 1, this.pageSize).pipe((take(1))).subscribe((res: any) => {
            if (res && res?.book && Array.isArray(res?.book)) {
              this.bookList = res?.book;
              this.allBookList = res?.book;
              this.totalbook = res?.totalBook;
            }
          });
        } else {
          this.bookList = [];
        }
        
      });
  }

  getUserDetail(): void {
    const cid = this.bservice.getUserAuthorization();
    this.bservice.getUserById(cid).pipe(take(1)).subscribe(
      (res: any) => {
        console.log("User***", res);
        if (!!res && res?.userId) {
          this.user = res;
        }
      }, err => {
        console.log("Err");
      }
    )
  }


  getBookList(isAllBook: boolean = false): void {
    let book: any = this.bservice.getAllBooks(this.offset - 1 < 0 ? 0 : this.offset - 1, this.pageSize);
    if (!isAllBook) {
      book = this.bservice.getBookByCategory(this.category, this.offset - 1 < 0 ? 0 : this.offset - 1, this.pageSize);
    }
    book.pipe(take(1)).subscribe((res: any) => {
      ;
      if (res && res?.book && Array.isArray(res?.book)) {
        this.bookList = res?.book;
        this.allBookList = res?.book;
        this.totalbook = res?.totalBook;
      }
    }, (err: any) => {
      console.log("Error");
    });
  }

  addToCart(book: Book): void {
    const element: any = document.getElementById(book?.bookId.toString());
  let qty:any= element!==null ? element.value : 0; 
  if(qty ===""){
    element.value=0;
    qty=0;
  }
    if (qty === 0 || qty === "0" || qty <0) {
      alert("Qunatity must be more than zero");
      return ;
    }

    if (qty > book?.quantity) {
      alert('Added quantity should not greater than available quantity');
      return;
    }
    
    const body: any = {
      quantity: qty,
      mrpPrice: book?.mrpPrice,
      boook: book,
      user: this.user
    };
    console.log("add to cart", body);
    this.bservice.addToCart(body, book?.bookId, this.user?.userId).pipe(take(1)).subscribe(
      (res: any) => {
        console.log(res);
        if (!!res && res?.cartId) {
        alert("book added sucessfully");
          this.getBookList(true);
          
          
        }
      }, err => {
        console.log("Error");
      }
      
    )
    
  }
  
  getBookByCategory(): void {
    this.offset = 0;
    this.totalbook = 1;
    if (this.category === "100") {
      this.getBookList(true);
    } else {
      this.getBookList(false);
    }
  }

  onNextPageClick(pageOffSet: any): void {
    this.offset = pageOffSet;
    this.getBookList(this.category === 100 || this.category === "100");
  }

  onPreviousPageClick(pageOffSet: any): void {
    this.offset -= 1;
    this.getBookList(this.category === 100 || this.category === "100");
  }

  onFirstPageClick(pageOffSet: any): void {
    this.offset = 0;
    this.getBookList(this.category === 100 || this.category === "100");
  }

  onLastPageClick(pageOffSet: any): void {
    const lastPage = Math.ceil(this.totalbook / this.pageSize);
    this.offset = lastPage;
    this.getBookList(this.category === 100 || this.category === "100");
  }
  gotocartList(): void {
    this.router.navigate(["/user/cart"]);
  }
  
  getSelectedType(event: any): void {
    this.searchType = event?.value;
    if (this.searchType === "bysearch") {
      this.bookList = [];
    } else {
      //All category dropdown
      this.getBookList(true);
    }
  }

  getSearchWord(ev: any): void {
    setTimeout(() => {
      this.userInputUpdate.next(this.searchKeyword);
    }, 100);
  }

}