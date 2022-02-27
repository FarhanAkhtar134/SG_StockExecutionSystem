package com.sgstockexecutionsys.webapi.orders;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sgstockexecutionsys.webapi.stock.Currency;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Arrays;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.notNullValue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@WebMvcTest(OrderItemController.class)
public class OrderItemControllerTest {

    private final String basePath = "/api/v1";
    @Autowired
    private MockMvc mockMvc;
    private ObjectMapper objectMapper = new ObjectMapper();

    @MockBean
    private OrderItemRepository orderItemRepositoryMock;

    @Test
    public void test_post_orders_ok() throws Exception {
        OrderItem orderItem = OrderItem
                .builder()
                .stockId("9566837b-dfb0-4754-a752-b97a6ede8c80")
                .currency(Currency.HKD)
                .ric("0005.HK")
                .bloombergTicker("5 HK")
                .bloombergTickerLocal("5 HK")
                .name("HSBC Holdings PLC")
                .country("Hong Kong")
                .price(295.64)
                .side("Buy")
                .status("Not Ready")
                .executionMode(null)
                .orderPrice(null)
                .amount(null)
                .build();
        String orderItemJson = objectMapper.writeValueAsString(orderItem);

        when(orderItemRepositoryMock.insert(any(OrderItem.class))).thenReturn(orderItem);

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post(basePath + "/orders")
                        .content(orderItemJson)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        verify(orderItemRepositoryMock, times(1)).insert(orderItem);

        String resultBody = result.getResponse().getContentAsString();
        assertThat(resultBody, is(notNullValue()));
        assertThat(resultBody, is(orderItemJson));
    }

    @Test
    public void test_delete_orders_ok() throws Exception {
        List<String> ids = Arrays.asList("9566837b-dfb0-4754-a752-b97a6ede8c80", "9566837b-dfb0-4754-a752-b97a6ede8c81", "9566837b-dfb0-4754-a752-b97a6ede8c81");
        String idsJson = objectMapper.writeValueAsString(ids);

        doNothing().when(orderItemRepositoryMock).deleteAllById(anyIterable());

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.delete(basePath + "/orders")
                        .content(idsJson)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        verify(orderItemRepositoryMock, times(1)).deleteAllById(ids);

        String resultBody = result.getResponse().getContentAsString();
        assertThat(resultBody, is(notNullValue()));
        assertThat(resultBody, is(idsJson));
    }

    @Test
    public void test_get_orders_ok() throws Exception {
        String page = "1";
        String perPage = "10";

        List<OrderItem> orderItems = Arrays.asList(
                OrderItem
                        .builder()
                        .stockId("9566837b-dfb0-4754-a752-b97a6ede8c80")
                        .currency(Currency.HKD)
                        .ric("0005.HK")
                        .bloombergTicker("5 HK")
                        .bloombergTickerLocal("5 HK")
                        .name("HSBC Holdings PLC")
                        .country("Hong Kong")
                        .price(295.64)
                        .side("Buy")
                        .status("Not Ready")
                        .executionMode(null)
                        .orderPrice(null)
                        .amount(null)
                        .build(),
                OrderItem
                        .builder()
                        .stockId("9566837b-dfb0-4754-a752-b97a6ede8c80")
                        .currency(Currency.HKD)
                        .ric("0006.HK")
                        .bloombergTicker("5 HK")
                        .bloombergTickerLocal("5 HK")
                        .name("HSBC Holdings PLC")
                        .country("Hong Kong")
                        .price(295.64)
                        .side("Buy")
                        .status("Not Ready")
                        .executionMode(null)
                        .orderPrice(null)
                        .amount(null)
                        .build(),
                OrderItem
                        .builder()
                        .stockId("9566837b-dfb0-4754-a752-b97a6ede8c80")
                        .currency(Currency.HKD)
                        .ric("0007.HK")
                        .bloombergTicker("5 HK")
                        .bloombergTickerLocal("5 HK")
                        .name("HSBC Holdings PLC")
                        .country("Hong Kong")
                        .price(295.64)
                        .side("Buy")
                        .status("Not Ready")
                        .executionMode(null)
                        .orderPrice(null)
                        .amount(null)
                        .build()
        );

        Page<OrderItem> orderItemsPage = new PageImpl<>(orderItems);
        OrderListResponse orderListResponse = OrderListResponse
                .builder()
                .orders(orderItemsPage)
                .total((int)orderItemsPage.getTotalElements())
                .build();

        when(orderItemRepositoryMock.findAll()).thenReturn(orderItems);
        when(orderItemRepositoryMock.findAll(any(Pageable.class))).thenReturn(orderItemsPage);

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get(basePath + "/orders/" + page + "/" + perPage)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        verify(orderItemRepositoryMock, times(1)).findAll();
        verify(orderItemRepositoryMock, times(1)).findAll(
                PageRequest.of(Integer.parseInt(page) - 1, Integer.parseInt(perPage))
        );

        String resultBody = result.getResponse().getContentAsString();
        assertThat(resultBody, is(notNullValue()));
        assertThat(resultBody, is(objectMapper.writeValueAsString(orderListResponse)));
    }

    @Test
    public void test_put_orders_reject() throws Exception {
        List<OrderItem> orderItemsRequest = Arrays.asList(
                OrderItem
                    .builder()
                    .stockId("9566837b-dfb0-4754-a752-b97a6ede8c80")
                    .currency(Currency.HKD)
                    .ric("388.HK")
                    .bloombergTicker("388 HK")
                    .bloombergTickerLocal("388 HK")
                    .name("HSBC Holdings PLC")
                    .country("Hong Kong")
                    .price(295.64)
                    .side("Buy")
                    .status("Not Ready")
                    .executionMode(null)
                    .orderPrice(null)
                    .amount(null)
                    .build()
            );
        List<OrderItem> orderItemsResponse = Arrays.asList(
                OrderItem
                        .builder()
                        .stockId("9566837b-dfb0-4754-a752-b97a6ede8c80")
                        .currency(Currency.HKD)
                        .ric("388.HK")
                        .bloombergTicker("388 HK")
                        .bloombergTickerLocal("388 HK")
                        .name("HSBC Holdings PLC")
                        .country("Hong Kong")
                        .price(295.64)
                        .side("Buy")
                        .status("Rejected")
                        .executionMode(null)
                        .orderPrice(null)
                        .amount(null)
                        .build()
        );
        String orderItemReqJson = objectMapper.writeValueAsString(orderItemsRequest);
        String orderItemResJson = objectMapper.writeValueAsString(orderItemsResponse);

        when(orderItemRepositoryMock.saveAll(any())).thenReturn(orderItemsResponse);

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.put(basePath + "/orders")
                        .content(orderItemReqJson)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                        .andExpect(status().isNotAcceptable())
                        .andReturn();

        verify(orderItemRepositoryMock, times(1)).saveAll(orderItemsResponse);

        String resultBody = result.getResponse().getContentAsString();
        assertThat(resultBody, is(notNullValue()));
        assertThat(resultBody, is(orderItemResJson));
    }

    @Test
    public void test_put_orders_gatewayTimeout() throws Exception {
        List<OrderItem> orderItemsRequest = Arrays.asList(
                OrderItem
                        .builder()
                        .stockId("9566837b-dfb0-4754-a752-b97a6ede8c80")
                        .currency(Currency.HKD)
                        .ric("11.HK")
                        .bloombergTicker("11 HK")
                        .bloombergTickerLocal("11 HK")
                        .name("HSBC Holdings PLC")
                        .country("Hong Kong")
                        .price(295.64)
                        .side("Buy")
                        .status("Not Ready")
                        .executionMode(null)
                        .orderPrice(null)
                        .amount(null)
                        .build()
        );
        List<OrderItem> orderItemsResponse = Arrays.asList(
                OrderItem
                        .builder()
                        .stockId("9566837b-dfb0-4754-a752-b97a6ede8c80")
                        .currency(Currency.HKD)
                        .ric("11.HK")
                        .bloombergTicker("11 HK")
                        .bloombergTickerLocal("11 HK")
                        .name("HSBC Holdings PLC")
                        .country("Hong Kong")
                        .price(295.64)
                        .side("Buy")
                        .status("Rejected")
                        .executionMode(null)
                        .orderPrice(null)
                        .amount(null)
                        .build()
        );
        String orderItemReqJson = objectMapper.writeValueAsString(orderItemsRequest);
        String orderItemResJson = objectMapper.writeValueAsString(orderItemsResponse);

        when(orderItemRepositoryMock.saveAll(any())).thenReturn(orderItemsResponse);

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.put(basePath + "/orders")
                        .content(orderItemReqJson)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                        .andExpect(status().isGatewayTimeout())
                        .andReturn();

        verify(orderItemRepositoryMock, times(1)).saveAll(orderItemsResponse);

        String resultBody = result.getResponse().getContentAsString();
        assertThat(resultBody, is(notNullValue()));
        assertThat(resultBody, is(orderItemResJson));
    }

    @Test
    public void test_put_orders_internalServerError() throws Exception {
        List<OrderItem> orderItemsRequest = Arrays.asList(
                OrderItem
                        .builder()
                        .stockId("9566837b-dfb0-4754-a752-b97a6ede8c80")
                        .currency(Currency.HKD)
                        .ric("0005.HK")
                        .bloombergTicker("5 HK")
                        .bloombergTickerLocal("5 HK")
                        .name("HSBC Holdings PLC")
                        .country("Hong Kong")
                        .price(295.64)
                        .side("Buy")
                        .status("Not Ready")
                        .executionMode(null)
                        .orderPrice(null)
                        .amount(null)
                        .build()
        );
        List<OrderItem> orderItemsResponse = Arrays.asList(
                OrderItem
                        .builder()
                        .stockId("9566837b-dfb0-4754-a752-b97a6ede8c80")
                        .currency(Currency.HKD)
                        .ric("0005.HK")
                        .bloombergTicker("5 HK")
                        .bloombergTickerLocal("5 HK")
                        .name("HSBC Holdings PLC")
                        .country("Hong Kong")
                        .price(295.64)
                        .side("Buy")
                        .status("Rejected")
                        .executionMode(null)
                        .orderPrice(null)
                        .amount(null)
                        .build()
        );
        String orderItemReqJson = objectMapper.writeValueAsString(orderItemsRequest);
        String orderItemResJson = objectMapper.writeValueAsString(orderItemsResponse);

        when(orderItemRepositoryMock.saveAll(any())).thenReturn(orderItemsResponse);

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.put(basePath + "/orders")
                        .content(orderItemReqJson)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                        .andExpect(status().isInternalServerError())
                        .andReturn();

        verify(orderItemRepositoryMock, times(1)).saveAll(orderItemsResponse);

        String resultBody = result.getResponse().getContentAsString();
        assertThat(resultBody, is(notNullValue()));
        assertThat(resultBody, is(orderItemResJson));
    }

    @Test
    public void test_put_orders_book_ok() throws Exception {
        List<OrderItem> orderItemsRequest = Arrays.asList(
                OrderItem
                        .builder()
                        .stockId("9566837b-dfb0-4754-a752-b97a6ede8c80")
                        .currency(Currency.HKD)
                        .ric("0408.HK")
                        .bloombergTicker("408 HK")
                        .bloombergTickerLocal("408 HK")
                        .name("HSBC Holdings PLC")
                        .country("Hong Kong")
                        .price(295.64)
                        .side("Buy")
                        .status("Not Ready")
                        .executionMode(null)
                        .orderPrice(null)
                        .amount(null)
                        .build()
        );
        List<OrderItem> orderItemsResponse = Arrays.asList(
                OrderItem
                        .builder()
                        .stockId("9566837b-dfb0-4754-a752-b97a6ede8c80")
                        .currency(Currency.HKD)
                        .ric("0408.HK")
                        .bloombergTicker("408 HK")
                        .bloombergTickerLocal("408 HK")
                        .name("HSBC Holdings PLC")
                        .country("Hong Kong")
                        .price(295.64)
                        .side("Buy")
                        .status("Booked")
                        .executionMode(null)
                        .orderPrice(null)
                        .amount(null)
                        .build()
        );
        String orderItemReqJson = objectMapper.writeValueAsString(orderItemsRequest);
        String orderItemResJson = objectMapper.writeValueAsString(orderItemsResponse);

        when(orderItemRepositoryMock.saveAll(any())).thenReturn(orderItemsResponse);

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.put(basePath + "/orders")
                        .content(orderItemReqJson)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                        .andExpect(status().isOk())
                        .andReturn();

        verify(orderItemRepositoryMock, times(1)).saveAll(orderItemsResponse);

        String resultBody = result.getResponse().getContentAsString();
        assertThat(resultBody, is(notNullValue()));
        assertThat(resultBody, is(orderItemResJson));
    }


}
