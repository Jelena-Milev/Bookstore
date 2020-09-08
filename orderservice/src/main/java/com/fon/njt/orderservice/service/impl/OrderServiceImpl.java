package com.fon.njt.orderservice.service.impl;

import com.fon.njt.orderservice.controller.BookServiceAPI;
import com.fon.njt.orderservice.controller.BookStorageAPI;
import com.fon.njt.orderservice.dto.book.BookResponseDto;
import com.fon.njt.orderservice.dto.request.OrderItemRequestDto;
import com.fon.njt.orderservice.dto.request.OrderRequestDto;
import com.fon.njt.orderservice.dto.response.OrderResponseDto;
import com.fon.njt.orderservice.dto.storage.SoldItemRequestDto;
import com.fon.njt.orderservice.dto.storage.StorageItemResponseDto;
import com.fon.njt.orderservice.dto.user.UserInfoDto;
import com.fon.njt.orderservice.exception.BookIsNotForSaleException;
import com.fon.njt.orderservice.exception.NotEnoughBooksInStockException;
import com.fon.njt.orderservice.mapper.OrderMapper;
import com.fon.njt.orderservice.model.OrderEntity;
import com.fon.njt.orderservice.model.OrderItemEntity;
import com.fon.njt.orderservice.repository.OrderRepository;
import com.fon.njt.orderservice.service.OrderService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository repository;
    private final OrderMapper mapper;
    private final BookServiceAPI bookServiceAPI;
    private final BookStorageAPI storageAPI;

    public OrderServiceImpl(OrderRepository repository, OrderMapper mapper, BookServiceAPI bookServiceAPI, BookStorageAPI storageAPI) {

        this.repository = repository;
        this.mapper = mapper;
        this.bookServiceAPI = bookServiceAPI;
        this.storageAPI = storageAPI;
    }

    @Override
    public List<OrderResponseDto> getOrdersByUserId(String userId, UserInfoDto userInfoDto) {
        final List<OrderEntity> orders = repository.findByUserIdEqualsOrderByDateDesc(userId);
        orders.forEach(order -> setBooks(order));
        final List<OrderResponseDto> orderResponseDtos = new ArrayList<>(orders.size());
        orders.forEach(order -> orderResponseDtos.add(mapper.mapToDto(order, userInfoDto)));
        return orderResponseDtos;
    }

    @Override
    public void checkAvailability(List<OrderItemRequestDto> items) {
        final List<Long> bookIds = items.stream().map(item -> item.getBookId()).collect(Collectors.toList());
        final List<StorageItemResponseDto> storageItems = storageAPI.getStorageItemsInBulk(bookIds);
        for (OrderItemRequestDto itemDto : items) {
            //ako get baci exception znaci da knjige iz stavke nema u listi sa bookstorage - baci exception
            StorageItemResponseDto storageItem = storageItems.stream().filter(si -> si.getBookId() == itemDto.getBookId()).findFirst().orElseThrow(() -> new BookIsNotForSaleException(itemDto.getBookTitle()));
            if (!storageItem.isInStock())
                throw new BookIsNotForSaleException(itemDto.getBookTitle());
            if (storageItem.getPiecesAvailable() < itemDto.getQuantity())
                throw new NotEnoughBooksInStockException(itemDto.getBookTitle());
            //ako get baci exception znaci da knjige iz stavke nema u listi sa bookservisa - baci exception
        }
    }

    @Override
    @Transactional
    public OrderResponseDto create(OrderRequestDto dto, UserInfoDto userInfoDto) {
        //ima listu itema, svaki ima bookId i quantity
        OrderEntity order = mapper.mapToEntity(dto);

        final List<Long> bookIds = dto.getItems().stream().map(item -> item.getBookId()).collect(Collectors.toList());
        final List<BookResponseDto> books = bookServiceAPI.getBooksInBulk(bookIds);

//        final List<StorageItemResponseDto> storageItems = storageAPI.getStorageItemsInBulk(bookIds);

        calculateItemsPrices(order, books);

        order.setDate(LocalDateTime.now());
        order.calculateTotalPrice();
        final OrderEntity savedOrder = repository.save(order);
        final List<SoldItemRequestDto> soldItemRequestDtos = savedOrder.getItems().stream().map(item -> new SoldItemRequestDto(item.getBookId(), item.getQuantity())).collect(Collectors.toList());
        storageAPI.updateBooksSold(soldItemRequestDtos);
        return mapper.mapToDto(savedOrder, userInfoDto);
    }

    private void calculateItemsPrices(OrderEntity order, List<BookResponseDto> books) {
        for (OrderItemEntity item : order.getItems()) {
            BookResponseDto bookDto = books.stream().filter(book -> book.getId() == item.getBookId()).findFirst().orElseThrow(() -> new BookIsNotForSaleException(item.getBookTitle()));
            item.setBook(bookDto);
            final BigDecimal itemPrice = bookDto.getPrice().multiply(new BigDecimal(item.getQuantity().intValue()));
            item.setItemPrice(itemPrice);
        }
    }

    private void setBooks(OrderEntity order) {
        final List<Long> bookIds = order.getItems().stream().map(item -> item.getBookId()).collect(Collectors.toList());
        final List<BookResponseDto> books = bookServiceAPI.getBooksInBulk(bookIds);
        for (OrderItemEntity item : order.getItems()) {
            BookResponseDto bookDto = books.stream().filter(book -> book.getId() == item.getBookId()).findFirst().orElse(new BookResponseDto());
            item.setBook(bookDto);
        }
    }
}
