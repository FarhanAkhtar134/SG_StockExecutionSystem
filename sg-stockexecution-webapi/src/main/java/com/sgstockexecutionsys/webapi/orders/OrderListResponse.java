package com.sgstockexecutionsys.webapi.orders;


import lombok.Builder;
import lombok.Data;
import org.springframework.data.domain.Page;

@Data
@Builder
public class OrderListResponse {

    Page<OrderItem> orders;
    int total;
}
