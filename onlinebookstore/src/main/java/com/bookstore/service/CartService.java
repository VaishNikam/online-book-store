package com.bookstore.service;

import java.util.List;

import com.bookstore.entity.Cart;
import com.bookstore.entity.User;


public interface CartService {
	Cart addCart(Cart cart,long bookId,long userId);
	List<Cart> getAllCarts();
	Cart getCartById(long cartId);
	Cart updateCart(Cart cart, long cartId);
	void deleteCart(long cartId);
	void deleteCartByUser(User u);
}
