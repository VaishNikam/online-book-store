package com.bookstore.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bookstore.entity.Order;


	@Repository
	public interface OrderRepository extends JpaRepository<Order, Long> {

		public List<Order> findByUserUserId(long userId);
		public void deleteByOrderId(long orderId);
	
}
