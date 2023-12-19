package com.bookstore.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
	@Table(name = "cart_table")
	@SequenceGenerator(name = "generator3", sequenceName = "gen3", initialValue = 1500)
	public class Cart {

		@Id
		@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator3")
		@Column(name = "cart_id")
		private long cartId;


		
		@Column(name = "quantity")
		private long quantity;

		@Column(name = "mrp_price", nullable = false)
		private double mrpPrice;


		
		@ManyToOne( cascade=CascadeType.MERGE)
		@JoinColumn(name="book_id")
		//@JsonIgnore
	    private Book book;
		
		@ManyToOne( cascade=CascadeType.MERGE)
		@JoinColumn(name="user_id")
	    private User user;
		
		
		
		public Cart() {

		}



		public long getCartId() {
			return cartId;
		}



		public void setCartId(long cartId) {
			this.cartId = cartId;
		}



		public long getQuantity() {
			return quantity;
		}



		public void setQuantity(long quantity) {
			this.quantity = quantity;
		}



		public double getMrpPrice() {
			return mrpPrice;
		}



		public void setMrpPrice(double mrpPrice) {
			this.mrpPrice = mrpPrice;
		}



		public Book getBook() {
			return book;
		}



		public void setBook(Book book) {
			this.book = book;
		}



		public User getUser() {
			return user;
		}



		public void setUser(User user) {
			this.user = user;
		}



		@Override
		public String toString() {
			return "Cart [cartId=" + cartId + ", quantity=" + quantity + ", mrpPrice=" + mrpPrice + ", book=" + book
					+ ", user=" + user + "]";
		}
		
		
}
