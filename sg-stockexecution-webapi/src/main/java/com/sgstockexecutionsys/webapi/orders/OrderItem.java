package com.sgstockexecutionsys.webapi.orders;


import com.sgstockexecutionsys.webapi.stock.Currency;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "orderList")
@Data
@Builder
public class OrderItem {

    @Id
    private String id;
    private String stockId;
    private Currency currency;
    private String ric;
    private String bloombergTicker;
    private String bloombergTickerLocal;
    private String name;
    private String country;
    private Double price;
    private String side;
    private String status;
    private String executionMode;
    private Double orderPrice;
    private Integer amount;


}
