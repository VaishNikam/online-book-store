import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { Book } from '../../model/book.model';
import { BookstoreService } from 'src/app/bookstore.service';

@Component({
  selector: 'app-admin-addbook',
  templateUrl: './admin-addbook.component.html',
  styleUrls: ['./admin-addbook.component.css']
})
export class AdminAddbookComponent {

  bookname: string = '';
  image: string = '';
  description: string = '';
  mrpPrice: number = 0;
  quantity: number = 0;
  isEdit: boolean = false;
  bookId: any;
  getCategoryList: any[] = [];
  category: number = 0;
  authorName:string ='';

  constructor(

    private bservice: BookstoreService,
    private router: Router,
    private activateRouter: ActivatedRoute


  ) {
    this.activateRouter.queryParams.subscribe((params: any) => {
      if (params?.id) {
        this.isEdit = true;
        this.bservice.getBookById(params?.id).pipe(take(1)).subscribe((res:any)=> {
          if(!!res && res?.bookId){
          
            const book :Book=res;
            console.log('>>>>', book);
            this.bookname= book?.bookname;
            this.description=book?.description;
            this.image=book?.image;
            this.mrpPrice=book?.mrpPrice;
            this.quantity=book?.quantity;
            this.bookId=book?.bookId;
            const categoryName = this.getCategoryList.find((cate: any) => cate?.name.toString() === book?.category)?.value;
            this.category = categoryName;
            this.authorName = book?.authorName;
          }
          console.log(res);
        });
      }

    })
  }
  ngOnInit(): void {
    this.bservice.isUserLoginPresent();
    this.getCategoryList = this.bservice.getCategoryList();
  }

  onAddBook(): void {
   
    if (this.bookname === '') {
      alert("Book name is required");
      return;
    }
    if (this.description === '') {
      alert("description  is required");
      return;
    }

    if (this.image === '') {
      alert("Image should not be blank");
      return;
    }
    console.log("******MRP price",this.mrpPrice);
    if (this.mrpPrice === 0 || this.mrpPrice===null) {
      alert("MRP Price should not be zero/blank");
      return;
    }
    if (this.quantity === 0|| this.quantity===null || this.quantity <0) {
      alert("Quantity should not be zero/blank and negative");
      return;
    }
    
 

    const body: any = {
      bookname: this.bookname,
      image: this.image,
      description: this.description,
      mrpPrice: this.mrpPrice,
      quantity: this.quantity,
      category: this.category,
      authorName: this.authorName
    }
    if(this.isEdit){
      console.log("=======>", body);
    this.bservice.editBook(body,this.bookId).pipe(take(1)).subscribe((res: any) => {
      console.log("*****", res);
      if (res && res?.bookId) {
        alert("Book updated sucessfully");
        this.router.navigate(["/admin/listbook"]);
      }
    }, err => {
      console.log("Error  ", err);
      alert("Something going wrong!! Please try again");
    })
    }else{
      console.log("=======>", body);
      this.bservice.addBook(body).pipe(take(1)).subscribe((res: any) => {
        console.log("*****", res);
        if (res && res?.bookId) {
          alert("Book added sucessfully");
          this.router.navigate(["/admin/booklist"]);
        }
      }, err => {
        console.log("Error  ", err);
        alert("Something going wrong!! Please try again");
      })
    }

    

  }
}
