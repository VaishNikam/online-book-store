package com.bookstore.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.bookstore.entity.Book;
import com.bookstore.entity.BookPaging;
import com.bookstore.entity.Category;

	@Repository 
	public interface BookRepository  extends JpaRepository<Book, Long>, PagingAndSortingRepository<Book, Long> {
		
		public List<Book> findByBookId(long bookId);
		public List<Book> findByCategory(Category category);
		public Page<Book> findByCategory(Category category, Pageable page);
		@Query("select b from Book b where b.mrpPrice = :mrpPrice")
		public List<Book> findByMrpPrice(double mrpPrice);
		public Page<Book> findByBooknameContains(String keyword, Pageable page);
	
}
