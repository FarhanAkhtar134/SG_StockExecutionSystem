package com.sgstockexecutionsys.webapi.orders;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderItemRepository extends MongoRepository<OrderItem, String> {
}
