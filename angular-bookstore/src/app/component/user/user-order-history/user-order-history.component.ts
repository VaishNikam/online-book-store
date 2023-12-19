import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Order } from '../../model/order.model';
import { Book } from '../../model/book.model';

@Component({
  selector: 'app-user-order-history',
  templateUrl: './user-order-history.component.html',
  styleUrls: ['./user-order-history.component.css']
})
export class UserOrderHistoryComponent {

  order: Order | undefined;
  book: Array<Book> = [];
  constructor(
    //In constructor argument pass component class name i.e OrderHistoryDialogComponent
    public dialogRef: MatDialogRef<UserOrderHistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    console.log('>>>', data);
    if (!!data && data?.orderId) {
      this.order = data;
      if (this.order?.book && this.order?.book.length > 0) {
        this.book = this.order?.book;
      }
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  
}
