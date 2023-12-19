import { Component } from '@angular/core';
import { Book } from '../../model/book.model';
import { BookstoreService } from 'src/app/bookstore.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';


@Component({
  selector: 'app-admin-listbook',
  templateUrl: './admin-listbook.component.html',
  styleUrls: ['./admin-listbook.component.css']
})
export class AdminListbookComponent {
  bookList: Array<Book> = [];
  getCategoryList: any[] = [];
  category: any = 100;
  allBookList: Array<Book> = [];
  offset: number = 0;
  pageSize: number = 8; // How many item you want to display in your page.
  totalbook: number = 1;

  constructor(
    private bservice: BookstoreService,
    private router: Router
  ) {
    this.bservice.isUserLoginPresent();
    this.getBookList(true);
  }

  ngOnInit(): void {
    this.getCategoryList = this.bservice.getCategoryList();
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

  delBook(book: Book): void {
    this.bservice.deleteBook(book?.bookId).pipe(take(1)).subscribe(
      (res: any) => {
        alert("Book deleted sucessfully");
        this.getBookList(this.category === 100 || this.category === "100");
      }, err => {
        console.log("Error");
      }
    )
  }

  editBook(book: Book): void {
    this.router.navigate(['/admin/addbook'], {
      queryParams: {
        id: book?.bookId
      }
    });

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

}
