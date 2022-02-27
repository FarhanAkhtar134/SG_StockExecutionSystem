package com.sgstockexecutionsys.webapi.stock;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.domain.Page;

@Data
@Builder
public class StockListResponse {
    Page<Stock> stocks;
    int total;
}
