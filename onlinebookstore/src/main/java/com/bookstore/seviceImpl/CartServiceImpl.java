package com.bookstore.seviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookstore.entity.Book;
import com.bookstore.entity.Cart;
import com.bookstore.entity.User;
import com.bookstore.exception.ResourceNotFoundException;
import com.bookstore.repository.CartRepository;
import com.bookstore.service.BookService;
import com.bookstore.service.CartService;
import com.bookstore.service.UserService;





	@Service
	public class CartServiceImpl implements CartService {
		
		@Autowired
		public CartRepository cartRepository;
		
//		@Autowired
//		public ProductRepository productRepository;

		@Autowired
		public BookService bookService;
		
		@Autowired
		public UserService userService;
		
	public CartServiceImpl(CartRepository cartRepository) {
			super();
			this.cartRepository = cartRepository;
		}

	@Override
	public Cart addCart(Cart cart, long bookId, long userId) {
		Book book =bookService.getBookByBookId(bookId) ;
		User user =userService.getUserById(userId) ;
		 List<Cart> crl = this.getAllCarts();
		 int flag = 0;
		 Cart existingCart = null;
		 if (crl.size() > 0) {
			 for (int i=0;i< crl.size();i++) {
				 Cart c = this.getCartById(crl.get(i).getCartId());
				 if (c.getUser().getUserId() == userId && c.getBook().getBookId() == bookId) {
					 flag = 1;
					 existingCart = c;
				 }
			 }
		 }
		 book.setQuantity(book.getQuantity()-cart.getQuantity());
		 if (flag ==1 && existingCart != null) {
			 existingCart.setQuantity(existingCart.getQuantity() + cart.getQuantity());
			 existingCart.setMrpPrice(book.getMrpPrice());
			existingCart.setUser(user);
			System.out.println("111111111111111111111111111111111");
			return this.updateCart(existingCart, existingCart.getCartId());
		 } else {
			 cart.setBook(book);
			cart.setMrpPrice(book.getMrpPrice());
			cart.setUser(user);
			System.out.println("2222222222222222222222222222222222222222");
			return cartRepository.save(cart);
		 }
	}

	@Override
	public List<Cart> getAllCarts() {
		return cartRepository.findAll();
	}

	@Override
	public Cart getCartById(long cartId) {
		return cartRepository.findById(cartId).orElseThrow(()->new ResourceNotFoundException("Cart","Id",cartId));
	}

	@Override
	public Cart updateCart(Cart cart, long cartId) {
		Cart existingCart=cartRepository.findById(cartId).orElseThrow(()->new ResourceNotFoundException("Cart","Id",cartId));
		existingCart.setQuantity(cart.getQuantity());
		//existingCart.setPrice(cart.getPrice());
		existingCart.setMrpPrice(cart.getMrpPrice());
		//existingCart.setImage(cart.getImage());
		existingCart.setCartId(cart.getCartId());
		existingCart.setBook(cart.getBook());
		//existingCart.setCustomerId(cart.getCustomerId());
		existingCart.setUser(cart.getUser());
	    cartRepository.save(existingCart);
	    
		return existingCart;
	}

	@Override
	public void deleteCart(long cartId) {
		Cart existingCart=cartRepository.findById(cartId).orElseThrow(()->new ResourceNotFoundException("Cart","Id",cartId));
		Book book =bookService.getBookByBookId(existingCart.getBook().getBookId());
		book.setQuantity(book.getQuantity());
		bookService.updateBook(book, book.getBookId());
		// cartRepository.findById(cartId).orElseThrow(()->new ResourceNotFoundException("Cart","Id",cartId));
		cartRepository.deleteById(cartId);
		
		
	}

	@Override
	public void deleteCartByUser(User u) {
		cartRepository.deleteCartByUser(u);
		
	}
}
