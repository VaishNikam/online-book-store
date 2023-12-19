import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookstoreService {
  url: string = 'http://localhost:8080';

  category: any = [{
    name: "BIOGRAPHIES" , value: 0,
  }, {
    name: "LOVESTORIES", value: 1,
  }, {
    name: "HORROR", value: 2
  }, {
    name: "THRILLER", value:  3
  }, {
    name: "COMIC", value:  4
  }, {
    name: "SCIENCE", value:  5
  },{
    name: "HISTORY", value: 6
  },{
    name : "MATHEMATICS", value: 7
  },{
    name: "FANTASY",value:8
  },{
    name: "COMPUTERSCIENCE", value:9
  },{
    name: "POLITICAL", value:10
  },{
    name:"FINANCE" , value:11
  }
]
  

  constructor(
    private http:HttpClient,
    private route:Router
  ) { }
   

  /* Client Registeration */
  signUp(body: any): Observable<any> {
    return this.http.post(this.url + "/api/users/register", body);
  }
  //client login
  userSignIn(body: any): Observable<any> {
    return this.http.post(this.url + "/api/users/login", body);
  }
  //once we logged in that time we are storing client id into token 
  storeUserAuthorization(token: string): void {
    localStorage.setItem("token", token);
  }

  getUserAuthorization(): any {
    const token = localStorage.getItem("token");
    return token;
  }

  storeUserName(name: string): void {
    localStorage.setItem("userName", name);
  }

  getUserName(): any {
    const name = localStorage.getItem("userName");
    return name;
  }

  userLogout(): void {
    localStorage.clear();
    this.route.navigate(['']);
  }
  //admin login
  adminSignIn(body: any): Observable<any> {
    return this.http.post(this.url + "/api/admin/login", body);
  }
  storeAdminAuthorization(token: string): void {
    localStorage.setItem("admin", token);
  }
  getAdminAuthorization(): any {
    const token = localStorage.getItem("admin");
    return token;
  }

  storeAdminUserName(name: string): void {
    localStorage.setItem("adminName", name);
  }

  getAdminName(): any {
    const name = localStorage.getItem("adminName");
    return name;
  }

  adminLogout(): void {
    localStorage.clear();
    this.route.navigate(['/']);
  }

  // this is to get username in admin.home.html part via admin.home.ts
  isAdminLoginPresent(): void {
    if (this.getAdminAuthorization() === null) {
      this.route.navigate(['/admin-login']);
    }
  }

  isUserLoginPresent(): void {
    if (this.getUserAuthorization() === null) {
      this.route.navigate(['/user-login']);
    }
  }


  
  addBook(body: any): Observable<any> {
    return this.http.post(this.url + "/api/books/addbooks", body);
  }
  
  getBooklist():Observable<any> {
    return this.http.get(this.url + "/api/books");
  }
  
  deleteBook(id :any):Observable<any> {
     return this.http.delete(this.url + "/api/books/" +id);
    //return this.http.delete(`${this.url}/api/books/${id}`);
  }
  
  getBookById(id:any):Observable<any> {
    return this.http.get(this.url + "/api/books/books/"+id);
  }
  
  editBook(body: any,id:any): Observable<any> {
    return this.http.put(this.url + "/api/books/"+id, body);
  }
  



  addToCart(body: any,pid:any,cid:any):Observable<any>{
    return this.http.post(this.url+"/api/cart/"+cid+"/"+pid,body);
  }
  
  getUserById(id:any):Observable<any> {
    return this.http.get(this.url + "/api/users/user/"+id);
  }
  
  cartList():Observable<any>{
    return this.http.get(this.url+"/api/cart/list");
  }
  placeOrder(cid:any,cartid:any,body:any):Observable<any> {
    return this.http.post(this.url + "/api/orders/"+cid+"/"+cartid, body);
  }
  deleteCart(id :any):Observable<any> {
    
    return this.http.delete(`${this.url}/api/cart/${id}`);
  }
  
  orderList(id:any):Observable<any>{
    return this.http.get(this.url+"/api/orders/"+id);
  }
  
  getCategoryList(): any {
    return this.category;
  }
  addPayment(body:any,orderid:any,cid:any):Observable<any> {
    return this.http.post(this.url + "/api/payements/"+orderid+"/"+cid, body);
  }

  forgotPassword(body: any):Observable<any> {
    return this.http.post(this.url + "/api/users/forgotpassword", body);
  }
  
  updateUserInformation(body: any):Observable<any> {
    return this.http.put(this.url + "/api/users/user/"+body?.userId, body);
  }
  
  changePassword(uid: any,password:any):Observable<any> {
    return this.http.post(this.url + "/api/users/"+uid+"/"+password,{});
  }
  
  getBookByCategory(cid: any, offset: any, limit: any):Observable<any>{
    return this.http.get(this.url+"/api/books/" + cid + "/"+ offset + "/" + limit);
  }
  
  getAllBooks(offset: any, limit: any):Observable<any>{
    return this.http.get(this.url+"/api/books/" + offset + "/" + limit);
  }

  getAllorderList():Observable<any>{
    return this.http.get(this.url+"/api/orders");
  }

  placeOrderItem(cid:any, body:any):Observable<any>{
    return this.http.post(this.url + "/api/orders/addOrder/"+cid, body);
  }

  addPaymentOfOrder(amount: any):Observable<any> {
    return this.http.get(this.url + "/api/orders/createTransaction/"+amount);
  }

  storeUserRole(role: string): void {
    localStorage.setItem("role", role);
  }

  getUserRole(): any {
    const role = localStorage.getItem("role");
    return role;
  }

  
  searchBookByName(keyword: any, pageNo: any, pageSize: any):Observable<any> {
    return this.http.get(this.url + `/api/books/bookSearch/${keyword}/${pageNo}/${pageSize}`);
  }
}


  
