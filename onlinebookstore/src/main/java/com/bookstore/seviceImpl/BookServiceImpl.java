package com.bookstore.seviceImpl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.bookstore.entity.Book;
import com.bookstore.entity.BookPaging;
import com.bookstore.entity.Category;
import com.bookstore.exception.ResourceNotFoundException;
import com.bookstore.repository.BookRepository;
import com.bookstore.service.BookService;


	@Service
	public class BookServiceImpl  implements BookService{
		@Autowired
		private BookRepository bookRepository;

		@Override
		public Book addBook(Book book) {
			System.out.println("Book added Succesfully "+book);
				book.setBookname(book.getBookname());
				book.setQuantity(book.getQuantity());
				book.setMrpPrice(book.getMrpPrice());
				book.setauthorName(book.getauthorName());
				book.setDescription(book.getDescription());
				return bookRepository.save(book);
			}


		@Override
		public List<Book> getAllBooks() {			
				return bookRepository.findAll();
			}	
		@Override
		public Book getBookByBookId(long bookId) {
			return bookRepository.findById(bookId).orElseThrow(()->new ResourceNotFoundException("Book","Id",bookId));
		}

		

		@Override
		public Book updateBook(Book book, long bookId) {
			Book existingBook = bookRepository.findById(bookId).orElseThrow(()->new ResourceNotFoundException("book","bookId",bookId));
			existingBook.setBookname(book.getBookname());
			existingBook.setMrpPrice(book.getMrpPrice());
			existingBook.setImage(book.getImage());
			existingBook.setDescription(book.getDescription());
			existingBook.setauthorName(book.getauthorName());
			existingBook.setQuantity(book.getQuantity());

			bookRepository.save(existingBook);	
			return existingBook;		
		}

		@Override
		public void deleteBook(long bookId) {
			bookRepository.findById(bookId).orElseThrow(()->new ResourceNotFoundException("book","Id",bookId));
			bookRepository.deleteById(bookId);	
			
		}

		@Override
		public List<Book> findByCategory(Category category) {
			return bookRepository.findByCategory(category);
		}

		@Override
		public BookPaging findByCategory(Category category, Integer pageNo, Integer pageSize) {
			Pageable paging = PageRequest.of(pageNo, pageSize);
			Page<Book> pageResult = bookRepository.findByCategory(category, paging);
			BookPaging pr = new BookPaging();
			pr.setTotalBook(pageResult.getTotalElements());
			if(pageResult.hasContent()) {
	            pr.setBook(pageResult.getContent());
	        } else {
	        	 pr.setBook(new ArrayList<Book>());
	        }
			return pr;
		}

		@Override
		public BookPaging getAllBooks(Integer pageNo, Integer pageSize) {
			Pageable paging = PageRequest.of(pageNo, pageSize);
			Page<Book> pageResult = bookRepository.findAll(paging);
			BookPaging pr = new BookPaging();
			pr.setTotalBook(pageResult.getTotalElements());
			System.out.println(">>>>>"+ pageResult.getTotalPages());
			if(pageResult.hasContent()) {
	            pr.setBook(pageResult.getContent());
	        } else {
	        	 pr.setBook(new ArrayList<Book>());
	        }
			return pr;
		}

		@Override
		public List<Book> findByMrpPrice(double mrpPrice) {
			return bookRepository.findByMrpPrice(mrpPrice);
		}
		
		@Override
		public BookPaging findByBookname(String keyword, Integer pageNo, Integer pageSize) {
			Pageable paging = PageRequest.of(pageNo, pageSize);
			Page<Book> pageResult = bookRepository.findByBooknameContains(keyword, paging);
			BookPaging pr = new BookPaging();
			pr.setTotalBook(pageResult.getTotalElements());
			if(pageResult.hasContent()) {
	            pr.setBook(pageResult.getContent());
	        } else {
	        	 pr.setBook(new ArrayList<Book>());
	        }
			return pr;
		}
		
}
