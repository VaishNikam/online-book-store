package com.bookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bookstore.entity.Cart;
import com.bookstore.entity.User;



	@Repository
	public interface CartRepository extends JpaRepository<Cart, Long> {
		
		void deleteCartByUser(User u);
	
}
