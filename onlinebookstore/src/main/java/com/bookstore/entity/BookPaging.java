package com.bookstore.entity;

import java.util.List;



public class BookPaging {
	

		private List<Book> book;
		private long totalBook;
		
		public List<Book> getBook() {
			return book;
		}
		public void setBook(List<Book> book) {
			this.book = book;
		}
		
		public long getTotalBook() {
			return totalBook;
		}
		public void setTotalBook(long totalBook) {
			this.totalBook = totalBook;
		} 
	

}
