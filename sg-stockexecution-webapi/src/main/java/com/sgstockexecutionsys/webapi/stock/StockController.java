package com.sgstockexecutionsys.webapi.stock;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1")
public class StockController {

    @Autowired
    private StockRepository stockRepository;

    @GetMapping("/stocks/{page}/{perPage}")
    public ResponseEntity<StockListResponse> getStocks(@PathVariable("page") Integer page, @PathVariable("perPage") Integer perPage) {

        Integer count = stockRepository.findAll().size();
        Pageable pageable = PageRequest.of(page-1, perPage);
        StockListResponse stockListResponse = StockListResponse
                .builder()
                .total(count)
                .stocks(stockRepository.findAll(pageable))
                .build();
        return ResponseEntity.ok().body(stockListResponse);
    }
}
