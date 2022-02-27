package com.sgstockexecutionsys.webapi.stock;


import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "stockList")
@Data
public class Stock {

    @Id
    private String id;
    private Currency currency;
    private String ric;
    private String bloombergTicker;
    private String bloombergTickerLocal;
    private  String name;
    private  String country;
    private Double price;


}
