package com.bookstore.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.NamedQuery;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;

@Entity 
	@Table(name="book_table")
	@NamedQuery(name = "book.findByMrpPrice", query = "select b from Book b where b.mrpPrice = :mrpPrice")
	@SequenceGenerator(name = "generator2", sequenceName = "gen2", initialValue = 5000)
	public class Book {
		@Id
		@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator2")
		@Column(name="book_id")
		private long bookId;
		
		@NotEmpty(message = "Book name is required.")
	    @Column(name = "bookname", nullable = false, length =30)
		private String bookname;

		@Column(name="book_image")
		@NotEmpty
		private String image;
		
		@NotEmpty(message = "Book description is required.")
		@Column(name = "description", nullable = false)
		private String description;	
		
		@Column(name = "mrp_price", nullable = false)
	    private double mrpPrice;
		
		@Column(name = "quantity")
		private long quantity;
		
		
		private Category category; 
		
		@Column(name = "author_name")
		private String authorName;

		public long getBookId() {
			return bookId;
		}

		public void setBookId(long bookId) {
			this.bookId = bookId;
		}

		public String getBookname() {
			return bookname;
		}

		public void setBookname(String bookname) {
			this.bookname = bookname;
		}

		public String getImage() {
			return image;
		}

		public void setImage(String image) {
			this.image = image;
		}

		public String getDescription() {
			return description;
		}

		public void setDescription(String description) {
			this.description = description;
		}

		public double getMrpPrice() {
			return mrpPrice;
		}

		public void setMrpPrice(double mrpPrice) {
			this.mrpPrice = mrpPrice;
		}

		public long getQuantity() {
			return quantity;
		}

		public void setQuantity(long quantity) {
			this.quantity = quantity;
		}

		public Category getCategory() {
			return category;
		}

		public void setCategory(Category category) {
			this.category = category;
		}

		public String getauthorName() {
			return authorName;
		}

		public void setauthorName(String authorName) {
			this.authorName = authorName;
		}

		@Override
		public String toString() {
			return "Book [bookId=" + bookId + ", bookname=" + bookname + ", image=" + image + ", description="
					+ description + ", mrpPrice=" + mrpPrice + ", quantity=" + quantity + ", category=" + category
					+ ", authorName=" + authorName + "]";
		}

		
		
		
		
}
