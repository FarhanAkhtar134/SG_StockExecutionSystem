package com.sgstockexecutionsys.webapi.orders;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1")
public class OrderItemController {

    @Autowired
    private OrderItemRepository orderItemRepository;

    /*
     * When click buy button send the selected stock id in request to this method
     * selected stockId is the monogoID not stock id of the stocks
     * e.g. use data-value e.g. <Button data-stockId = {**here inject the selected stock id (the mongodb: _id)} />
     * can extract this data attribute or extract it from the query parameter.
     * */

    @PostMapping(value = "/orders")
    @ResponseBody
    public ResponseEntity<OrderItem> insertOrder(@RequestBody OrderItem orderItem) {
        return ResponseEntity.ok().body(orderItemRepository.insert(orderItem));
    }

    @DeleteMapping("/orders")
    public ResponseEntity removeOrders(@RequestBody List<String> ids) {
        try {
            orderItemRepository.deleteAllById(ids);
            return ResponseEntity.ok().body(ids);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @PutMapping("/orders")
    public ResponseEntity updateOrders(@RequestBody List<OrderItem> orderItems) {
            List<OrderItem> orderItemsUpdate = orderItems.stream().map(o -> {
                if(Arrays.asList("5 HK", "11 HK", "388 HK").contains(o.getBloombergTickerLocal())){
                    o.setStatus("Rejected");
                } else {
                    if("Market".equals(o.getExecutionMode())){
                        o.setOrderPrice(o.getPrice() + 0.5);
                    }
                    o.setStatus("Booked");
                }
                return o;
            }).collect(Collectors.toList());

            List<OrderItem> orderItemsResult = orderItemRepository.saveAll(orderItemsUpdate);
            long internalServerErrorCount = orderItemsUpdate.stream().filter(oiu -> "5 HK".equals(oiu.getBloombergTickerLocal())).count();
            long gatewayTimeoutCount = orderItemsUpdate.stream().filter(oiu -> "11 HK".equals(oiu.getBloombergTickerLocal())).count();
            long rejectCount = orderItemsUpdate.stream().filter(oiu -> "388 HK".equals(oiu.getBloombergTickerLocal())).count();
            if(internalServerErrorCount > 0){
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(orderItemsResult);
            }
            if(gatewayTimeoutCount > 0){
                return ResponseEntity.status(HttpStatus.GATEWAY_TIMEOUT).body(orderItemsResult);
            }
            if(rejectCount > 0){
                return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(orderItemsResult);
            }
            return ResponseEntity.ok().body(orderItemsResult);
    }


    /*For fetching all the orders in the basket.
    fetch all the orders from the orderList collection in the stocks db
    again use pagination
    * */

    @GetMapping("/orders/{page}/{perPage}")

    public ResponseEntity<OrderListResponse> getOrders(@PathVariable("page") Integer page, @PathVariable("perPage") Integer perPage) {

        Integer count = orderItemRepository.findAll().size();
        Pageable pageable = PageRequest.of(page - 1, perPage);
        OrderListResponse orderListResponse = OrderListResponse
                .builder()
                .total(count)
                .orders(orderItemRepository.findAll(pageable))
                .build();
        return ResponseEntity.ok().body(orderListResponse);
    }
}
