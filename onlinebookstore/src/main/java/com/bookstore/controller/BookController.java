package com.bookstore.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookstore.entity.Book;
import com.bookstore.entity.BookPaging;
import com.bookstore.entity.Category;
import com.bookstore.service.BookService;

import jakarta.validation.Valid;

	@CrossOrigin(origins = "http://localhost:4200")

	@RestController
	@RequestMapping("/api/books")
	public class BookController {
		
		@Autowired
		private BookService bookService;

		
		//to add product to cart
			@PostMapping("/addbooks")
			public ResponseEntity<Book> addBook(@Valid @RequestBody Book book) {

				return new ResponseEntity<Book>(bookService.addBook(book), HttpStatus.CREATED);
			}

			// to get all products
			@GetMapping
			public List<Book> getAllBooks() {
				return bookService.getAllBooks();
			}

			// to get product by cart id
			@GetMapping("books/{bookId}")
			public ResponseEntity<Book> getBookById(@PathVariable("bookId") long bookId) {
				return new ResponseEntity<Book>(bookService.getBookByBookId(bookId), HttpStatus.OK);
			}

			// to update product
			@PutMapping("{bookId}")
			public ResponseEntity<Book> updateBook(@Valid @PathVariable("bookId") long bookId, @RequestBody Book book) {
				return new ResponseEntity<Book>(bookService.updateBook(book, bookId), HttpStatus.OK);
			}

			@DeleteMapping("{bookId}")
			public ResponseEntity<Boolean> deleteBook(@PathVariable("bookId") long bookId) {
				bookService.deleteBook(bookId);
				boolean flag = true;
				return new ResponseEntity<Boolean>(flag, HttpStatus.OK);
			}
			
			@GetMapping("/{categoryId}")
			public List<Book> getAllBooksByCategory(@PathVariable("categoryId") int categoryId) {
				Category c = Category.valueOf(categoryId);
				return bookService.findByCategory(c);
			}
			
			@GetMapping("/{categoryId}/{pageNo}/{pageSize}")
			public BookPaging getAllBooksByCategory(@PathVariable("categoryId") int categoryId, @PathVariable("pageNo") int pageNo, @PathVariable("pageSize") int pageSize) {
				Category c = Category.valueOf(categoryId);
				return bookService.findByCategory(c, pageNo, pageSize);
			}
			
			@GetMapping("/{pageNo}/{pageSize}")
			public BookPaging getAllBooks(@PathVariable("pageNo") int pageNo, @PathVariable("pageSize") int pageSize) {
				return bookService.getAllBooks(pageNo, pageSize);
			}
			
			@GetMapping("/mrp/{mrpPrice}")
			public List<Book> getByMRPPrice(@PathVariable("mrpPrice") double mrpPrice) {
				return bookService.findByMrpPrice(mrpPrice);
			}
			
			@GetMapping("/bookSearch/{keyword}/{pageNo}/{pageSize}")
			public BookPaging getBookByName(@PathVariable("keyword") String keyword,
					@PathVariable("pageNo") int pageNo, @PathVariable("pageSize") int pageSize) {
				return bookService.findByBookname(keyword, pageNo, pageSize);
			}

	
}
